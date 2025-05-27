const InventoryStatus = ({ quantity }) => {
  if (quantity > 10) return null;

  const baseStyles = "inline-block px-3 py-1 rounded-full text-xs font-semibold text-white";
  const badgeClass =
    quantity === 0
      ? "bg-red-500"
      : "bg-orange-500";

  const label =
    quantity === 0
      ? "Out of Stock"
      : `${quantity} item${quantity > 1 ? 's' : ''} left`;

  return (
    <div className={`${baseStyles} ${badgeClass}`}>
      {label}
    </div>
  );
};

export default InventoryStatus;
