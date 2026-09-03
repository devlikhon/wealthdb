export const formatSortCode = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  return digits.match(/.{1,2}/g)?.join("-") ?? digits;
};
