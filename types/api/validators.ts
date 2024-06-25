export enum ValidatorRole {
  CANDIDATE,
  ACTIVE,
  VERIFYING,
}

export interface Validator {
  rank: number;
  validators: string;
  role: ValidatorRole;
  commission: number;
  stake_amount: string;
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

export interface HistoricalValidator {
  event: string;
  exit_block: number;
  no: number;
  status: number;
  exit_timestamp: string;
  validators: string;
  lock_block: number;
  exited?: boolean;
}

export interface ValidatorsHistoryResponse {
  items: Array<HistoricalValidator>;
  next_page_params: {
    block_number: number;
    items_count: number;
  } | null;
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
