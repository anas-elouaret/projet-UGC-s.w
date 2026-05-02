const madFormatter = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatMAD(amount) {
  const value = Number(amount);
  if (Number.isNaN(value)) {
    return "";
  }
  return madFormatter.format(value);
}
