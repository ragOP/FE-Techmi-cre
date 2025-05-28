import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItem } from "../../../utils/local_storage";
import { toast } from "react-toastify";
import { addAddress } from "../helper/addAddress";
import { getAddresses } from "../helper/getAddresses";
import { deleteAddress } from "../helper/deleteAddress";
import { updateAddress } from "../helper/updateAddress";
import { Edit, Trash2 } from "lucide-react";
import { statesList } from "../../../utils/state/statesList";

const addressInitialState = {
  name: "",
  mobile: "",
  pincode: "",
  locality: "",
  address: "",
  city: "",
  state: "",
  state_code: "",
  landmark: "",
  alternatePhone: "",
  addressType: "home",
  isPrimary: false,
};

const AddressDialog = ({ onClose, setAddress }) => {
  const userId = getItem("userId");

  const queryClient = useQueryClient();
  const [editingAddress, setEditingAddress] = useState(null);

  const { data: addresses, isLoading } = useQuery({
    queryKey: ["user_addresses"],
    queryFn: () => getAddresses({ id: userId }),
  });

  const { mutate: createAddress } = useMutation({
    mutationFn: async (newAddress) => {
      if (!userId) return;
      const payload = {
        ...newAddress,
        user: userId,
      };
      const apiResponse = await addAddress({ payload });
      return apiResponse?.response;
    },
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries(["user_addresses"]);
        setEditingAddress(null);
        toast.success("Address added successfully");
      } else {
        toast.error(res?.message || "Failed to add address");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add address");
    },
  });

  const { mutate: modifyAddress } = useMutation({
    mutationFn: ({ id, payload }) => updateAddress({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user_addresses"]);
      setEditingAddress(null);
      toast.success("Address updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update address");
    },
  });

  const { mutate: removeAddress } = useMutation({
    mutationFn: (id) => deleteAddress({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user_addresses"]);
      toast.success("Address deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete address");
    },
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl mt-20 mb-8 ">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {editingAddress
              ? editingAddress._id
                ? "Edit Address"
                : "Add New Address"
              : "Saved Addresses"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {editingAddress ? (
          <AddressForm
            initialData={editingAddress}
            onSubmit={(data) => {
              console.log(data);
              if (editingAddress._id) {
                modifyAddress({ id: editingAddress._id, payload: data });
              } else {
                createAddress(data);
              }
            }}
            onCancel={() => setEditingAddress(null)}
          />
        ) : (
          <AddressList
            addresses={addresses}
            isLoading={isLoading}
            onAddNew={() => {
              if (addresses?.length >= 3) {
                toast.error("You can only save 3 addresses");
                return;
              }
              setEditingAddress(addressInitialState);
            }}
            onEdit={setEditingAddress}
            onDelete={removeAddress}
            setAddress={setAddress}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData({ ...addressInitialState, ...initialData });
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      onSubmit(formData);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  console.log(formData);
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="space-y-4">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Address Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Locality</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary h-24"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              name="state"
              value={formData.state || ""}
              onChange={(e) => {
                const selectedState = statesList.find(
                  (state) => state.name === e.target.value
                );
                handleInputChange({
                  target: {
                    name: "state",
                    value: selectedState.name,
                  },
                });
                handleInputChange({
                  target: {
                    name: "state_code",
                    value: selectedState.code,
                  },
                });
              }}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select State</option>
              {statesList.map((state) => (
                <option key={state.code} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Landmark (Optional)
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Alternate Phone (Optional)
            </label>
            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Address Type */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium mb-2">Address Type</label>
          <div className="flex gap-4">
            {["home", "work", "other"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={formData.addressType === type}
                  onChange={handleInputChange}
                  className="text-primary focus:ring-primary"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Is Primary */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPrimary"
            checked={formData.isPrimary || false}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isPrimary: e.target.checked,
              }))
            }
            className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label className="text-sm font-medium">Set as Primary Address</label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-6 border-t pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-[#00008B] text-[#00008B] hover:bg-[#00008B] hover:text-white rounded-md transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(e);
            }}
            className="px-6 py-2 bg-[#00008B] text-white rounded-md hover:bg-[#000070] transition"
          >
            {initialData._id ? "Update" : "Save"} Address
          </button>
        </div>
      </div>
    </form>
  );
};

const AddressItem = ({ address, onEdit, onDelete, setAddress, onClose }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this address?")) {
      onDelete(address._id);
    }
  };

  const handleSelectAdress = () => {
    setAddress(address);
    onClose();
  };

  return (
    <div className="border rounded-md p-4 hover:border-primary cursor-pointer group">
      <div className="flex items-start justify-between">
        <div onClick={handleSelectAdress}>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">{address.name}</span>
            <span className="text-xs text-gray-500">
              ({address.addressType})
            </span>
            {address.isPrimary && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Primary
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {address.address}, {address.locality}
          </p>
          <p className="text-sm text-gray-600">
            {address.city}, {address.state} - {address.pincode}
          </p>
          <p className="text-sm text-gray-600 mt-2">Phone: {address.mobile}</p>
        </div>
        <div className="flex gap-2">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(address)}
            className="flex items-center gap-1 text-gray-400 hover:text-primary invisible group-hover:visible transition-all duration-200 hover:underline"
          >
            {/* <Edit className="w-4 h-4" /> */}
            <span>Edit</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-gray-400 hover:text-red-500 invisible group-hover:visible transition-all duration-200 hover:underline"
          >
            {/* <Trash2 className="w-4 h-4" /> */}
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AddressList = ({
  addresses,
  isLoading,
  onAddNew,
  onEdit,
  onDelete,
  setAddress,
  onClose,
}) => {
  return (
    <div className="p-4 flex flex-col gap-4 justify-between">
      <div className="space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse p-4 border rounded-md">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))
        ) : addresses?.length > 0 ? (
          addresses.map((address) => (
            <AddressItem
              key={address._id}
              address={address}
              onEdit={onEdit}
              onDelete={onDelete}
              setAddress={setAddress}
              onClose={onClose}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No saved addresses found
          </div>
        )}
      </div>

      <button
        onClick={onAddNew}
        className="w-full mt-2 py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-primary hover:text-primary transition-colors"
      >
        + Add New Address
      </button>
    </div>
  );
};

export default AddressDialog;
