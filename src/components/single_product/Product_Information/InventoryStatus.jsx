const InventoryStatus = ({ quantity })  => {
  if (quantity > 10) return null;

  if (quantity === 0) {
    return (
      <div className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
        Out of Stock
      </div>
    );
  }

  return (
    <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
      {quantity} left. Order ASAP!
    </div>
  );
}

export default InventoryStatus;