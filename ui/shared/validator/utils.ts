import BigNumber from 'bignumber.js';

import config from 'configs/app';

export const formatNumberValue = (value: string | number | undefined | null, formatter?: (value: string | number) => string) => {
  return value !== undefined && value !== null && !Number.isNaN(Number(value)) ? String(formatter?.(value) || value) : '-';
};

export const toLocaleStringFormatter = (value: string | number) => Number(value).toLocaleString();
export const percentageFormatter = (value: string | number) => (Number(value) * 100).toFixed(2) + '%';

export const divDecimals = (value: string | number) => new BigNumber(value).div(10 ** config.chain.currency.decimals).toFixed();
export const currencyAmountFormatter = (value: string | number | undefined | null) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return '-';
  }
  return toLocaleStringFormatter(divDecimals(value));
};
