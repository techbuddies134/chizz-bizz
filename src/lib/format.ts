export const formatPKR = (value: number): string =>
  `Rs. ${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const DELIVERY_FEE = 199;
export const FREE_DELIVERY_THRESHOLD = 3000;
