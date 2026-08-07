export function formatCurrency(value, currency = 'INR') {
  const n = Number(value || 0);
  if (Number.isNaN(n)) return '';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(n);
}

export function formatINR(value) {
  return formatCurrency(value, 'INR');
}
