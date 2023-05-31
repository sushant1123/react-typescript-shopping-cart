const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { currency: "INR", style: "currency" });

export const formatCurrency = (amount: number) => {
  return CURRENCY_FORMATTER.format(amount);
};
