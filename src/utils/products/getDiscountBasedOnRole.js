export const getDiscountBasedOnRole = ({
  role,
  discounted_price,
  salesperson_discounted_price,
  dnd_discounted_price,
  price,
}) => {
  if (role === "user") {
    return discounted_price || price;
  } else if (role === "salesperson") {
    return salesperson_discounted_price || discounted_price || price;
  } else if (role === "dnd") {
    return dnd_discounted_price || discounted_price || price;
  } else {
    return discounted_price || price;
  }
};
