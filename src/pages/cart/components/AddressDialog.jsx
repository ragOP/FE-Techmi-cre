import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItem } from "../../../utils/local_storage";

const AddressDialog = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "home",
  });

  const { data: addresses, isLoading } = useQuery({
    queryKey: ["user_addresses"],
    queryFn: async () => {
      const res = await fetch("/api/addresses", {
        headers: { Authorization: `Bearer ${getItem("token")}` },
      });
      return res.json();
    },
  });

  const { mutate: createAddress } = useMutation({
    mutationFn: async (newAddress) => {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getItem("token")}`,
        },
        body: JSON.stringify({ ...newAddress, user: getItem("userId") }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user_addresses"]);
      setIsAddingNew(false);
      setFormData({
        name: "",
        mobile: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        landmark: "",
        alternatePhone: "",
        addressType: "home",
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAddress(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl mt-20 mb-8">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isAddingNew ? "Add New Address" : "Saved Addresses"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {!isAddingNew ? (
          <div className="p-4">
            {/* Address List */}
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
                  <div
                    key={address._id}
                    className="border rounded-md p-4 hover:border-primary cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
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
                        <p className="text-sm text-gray-600 mt-2">
                          Phone: {address.mobile}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-primary invisible group-hover:visible">
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No saved addresses found
                </div>
              )}
            </div>

            {/* Add New Button */}
            <button
              onClick={() => setIsAddingNew(true)}
              className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-primary hover:text-primary transition-colors"
            >
              + Add New Address
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4">
            <div className="space-y-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    Pincode
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    Locality
                  </label>
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
                <label className="block text-sm font-medium mb-1">
                  Full Address
                </label>
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
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
                    required
                  />
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
                <label className="block text-sm font-medium mb-2">
                  Address Type
                </label>
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
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 mt-6 border-t pt-4">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Save Address
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddressDialog;