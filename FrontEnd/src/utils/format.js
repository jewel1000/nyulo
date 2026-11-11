export const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const formatBDT = (amount) =>
  new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 }).format(amount);
