export const getDiscountBasedOnRole = ({
  role,
  discounted_price,
  salesperson_discounted_price,
  dnd_discounted_price,
}) => {
  if (role === "user") {
    return discounted_price;
  } else if (role === "salesperson") {
    return salesperson_discounted_price;
  } else if (role === "dnd") {
    return dnd_discounted_price;
  } else {
    return null;
  }
};
