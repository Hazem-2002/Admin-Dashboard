export const CurrencyFormat = (value) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
  }).format(value || 0);
