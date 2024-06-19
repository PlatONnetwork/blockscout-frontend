export const formatNumberValue = (value: string | number | undefined | null, formatter?: (value: string | number) => string) => {
  return value !== undefined && value !== null && !Number.isNaN(Number(value)) ? String(formatter?.(value) || value) : '-';
};

export const toLocaleStringFormatter = (value: string | number) => Number(value).toLocaleString();
export const percentageFormatter = (value: string | number) => (Number(value) * 100).toFixed(2) + '%';
