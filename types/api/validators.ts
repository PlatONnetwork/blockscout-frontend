export enum ValidatorRole {
  ACTIVE = 0,
  CANDIDATE = 1,
  VERIFYING = 2,
}

export interface Validator {
  rank: number;
  validators: string;
  role: ValidatorRole;
  commission: number;
  total_bonded_amount: string;
  total_bonded_percent: number;
  delegate_amount: string;
  expect_apr: string | null;
  block_rate: string | null;
}

export interface ValidatorsResponse {
  items: Array<Validator>;
  next_page_params: null;
}

export interface ValidatorsCountersResponse {
  reward_pool: string;
  total_bonded: string;
  total_bonded_24_hours: string;
  validators: number;
  validators_24_hours: number;
  block_reward: string;
  epoch_staking_reward: string;
}

export interface ValidatorsFilters {
  q: string;
}

export interface ValidatorsSorting {
  sort: 'commission' | 'expect_apr' | 'block_rate';
  order: 'asc' | 'desc';
}

export type ValidatorsSortingField = ValidatorsSorting['sort'];

export type ValidatorsSortingValue = `${ ValidatorsSortingField }-${ ValidatorsSorting['order'] }`;
