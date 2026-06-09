export const formatterPrice = (value: number, quantity: number = 1) => {
  return (value * quantity).toFixed(2).replace(".", ",");
};
