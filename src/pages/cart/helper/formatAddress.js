export const formatAddress = (address) => {
  if (!address) return "";
  // Only include non-empty fields
  const parts = [
    address.address,
    address.city,
    address.state,
    address.pincode,
  ].filter(Boolean);
  return parts.join(", ");
};
