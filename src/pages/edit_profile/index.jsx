import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddressManager from "../cart/components/AddressManager"; 
import { getUserDetails } from "./helpers/getUserDetails";
import { updateUserDetails } from "./helpers/updateUserDetails";
import { getItem } from "../../utils/local_storage";
import { toast } from "react-toastify";

const EditProfilePage = () => {
  const queryClient = useQueryClient();
  const userId = getItem("userId");
  
  const [form, setForm] = useState({
    name: "",
    mobile_number: "",
  });
  
  const [address, setAddress] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  // Fetch user data
  const { 
    data: user, 
    isLoading: userLoading, 
    error: userError,
    isError: isUserError 
  } = useQuery({
    queryKey: ["user_details", userId],
    queryFn: () => getUserDetails({ id: userId }),
    enabled: !!userId,
  });

  // Update user mutation
  const { 
    mutate: updateProfile, 
    isPending: isUpdating, 
    isSuccess, 
    isError: isUpdateError, 
  } = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (data) => {
      console.log("Profile updated successfully", data);
      toast.success("Profile updated successfully");
      setIsDirty(false);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["user_details", userId] });
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile");
    },
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        mobile_number: user.mobile_number || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);

  };

  const handleSave = (e) => {
    e.preventDefault();

    const updateData = {
      id: userId,
      updates: {
        name: form.name.trim(),
        mobile_number: form.mobile_number.trim(),
      }
    };

    updateProfile(updateData);
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name || "",
        mobile_number: user.mobile_number || "",
      });
      setIsDirty(false);
    }
  };

  // Loading state
  if (userLoading) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isUserError) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Profile</h2>
          <p className="text-red-600">
            {userError?.message || "Failed to load user profile. Please try again."}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No user ID
  if (!userId) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800">Please log in to edit your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile</h1>

      <form  className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 }`}
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Field (Read-only) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm cursor-not-allowed text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
        </div>

        {/* Mobile Field */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            id="mobile"
            name="mobile_number"
            type="tel"
            value={form.mobile_number}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 `}
            placeholder="Enter your mobile number"
          />
        </div>

        {/* Address Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Address Information</h3>
          <AddressManager 
            setAddress={setAddress} 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={isUpdating || !isDirty}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUpdating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
          
          {isDirty && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUpdating}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
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