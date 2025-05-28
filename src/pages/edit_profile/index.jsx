import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddressManager from "../cart/components/AddressManager";
import { getUserDetails } from "./helpers/getUserDetails";
import { updateUserDetails } from "./helpers/updateUserDetails";
import { getItem } from "../../utils/local_storage";
import FormInput from "./components/FormInut";
import MessageBox from "./components/MessageBox";
import SkeletonLoader from "./components/SkeletonLoader";
import { toast } from "react-toastify";

const INITIAL_FORM = { name: "", mobile_number: "" };

const EditProfilePage = () => {
  const queryClient = useQueryClient();
  const userId = getItem("userId");

  const [form, setForm] = useState(INITIAL_FORM);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const { data: user, isLoading, error, isError } = useQuery({
    queryKey: ["user_details", userId],
    queryFn: () => getUserDetails({ id: userId }),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const {
    mutate: updateProfile,
    isPending: isUpdating,
    isSuccess,
    isError: isUpdateError,
    error: updateError,
    reset: resetMutation,
  } = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      setIsDirty(false);
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user_details", userId] });
    },
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        mobile_number: user.mobile_number || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess || isUpdateError) {
      const timer = setTimeout(() => resetMutation(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isUpdateError]);

  const handleInputChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!form.name.trim()) errors.name = "Name is required";
    else if (form.name.length < 2) errors.name = "Name must be at least 2 characters";

    if (form.mobile_number && !/^\+?[\d\s\-()]{10,15}$/.test(form.mobile_number.replace(/\s/g, "")))
      errors.mobile = "Please enter a valid mobile number";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    updateProfile({
      id: userId,
      updates: {
        name: form.name.trim(),
        mobile_number: form.mobile_number.trim(),
      },
    });
  };

  const handleCancel = () => {
    setForm({
      name: user.name || "",
      mobile_number: user.mobile_number || "",
    });
    setIsDirty(false);
    setValidationErrors({});
  };

  if (!userId) return <MessageBox type="warning" message="Please log in to edit your profile." />;
  if (isLoading) return <SkeletonLoader />;
  if (isError) return <MessageBox type="error" message={error?.message || "Failed to load profile."} retry />;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form className="space-y-6">
        <FormInput
          id="name"
          label="Full Name *"
          value={form.name}
          name="name"
          onChange={handleInputChange}
          error={validationErrors.name}
          placeholder="Enter your full name"
        />

        <FormInput
          id="email"
          label="Email Address"
          value={user?.email || ""}
          disabled
          readOnly
          helper="Email cannot be changed"
        />

        <FormInput
          id="mobile"
          label="Mobile Number"
          value={form.mobile_number}
          name="mobile_number"
          onChange={handleInputChange}
          error={validationErrors.mobile}
          placeholder="Enter your mobile number"
        />

        <div>
          <h3 className="text-lg font-medium mb-3">Address Information</h3>
          <AddressManager setAddress={() => {}} onAddressChange={() => setIsDirty(true)} />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || isUpdating}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
          {isDirty && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
