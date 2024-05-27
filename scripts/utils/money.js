// export function formatCurrency(priceCents) {
//   return (Math.round(priceCents) / 100).toFixed(2);
// }

// export default formatCurrency;

export function formatCurrency(priceCents) {
  // Convert cents to rupees
  const rupees = priceCents;

  // Format rupees with Indian Rupee symbol and two decimal places
  return '₹' + rupees.toFixed(2);
}
