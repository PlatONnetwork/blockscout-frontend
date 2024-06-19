import type { HistoricalValidator, Validator, ValidatorResponse, ValidatorsCountersResponse } from 'types/api/validators';

export const VALIDATOR: Validator = {
  block_rate: null,
  commission: 0,
  delegate_amount: '0', //有效委托金额
  expect_apr: null,
  rank: 1,
  role: 2, // 0-candidate(质押节点) 1-active(共识节点候选人) 2-verifying(共识节点)
  validators: '0x1dd26dfb60b996fd5d5152af723949971d9119ee',
  total_bonded_amount: '0',
  total_bonded_percent: '0',
};

export const VALIDATORS_COUNTERS: ValidatorsCountersResponse = {
  block_reward: '0',
  epoch_staking_reward: '0',
  reward_pool: '0',
  total_bonded: '3000000000',
  total_bonded_24_hours: '3000000000',
  validators: 3,
  validators_24_hours: 3,
};

export const VALIDATOR_HISTORY: HistoricalValidator = {
  event: '21231',
  exit_block: 1222,
  no: 0,
  status: 0,
  exit_timestamp: '2020-10-17T22:27:00.000000Z',
  validators: '0x1dd26dfb60b996fd5d5152af723949971d9119ee',
};

export const VALIDATOR_DETAIL: ValidatorResponse = {
  blocks: 16514,
  commission: 0,
  delegations: '0',
  delegations_proportion: 0,
  delegator_rewards: '0', // delegator rewards
  detail: null,
  expect_apr: null,
  owner_address: '0x1dd26dfb60b996fd5d5152af723949971d9119ee',
  pending_withdrawal: '0',
  self_stakes: '1000000000',
  total_bonded: '1000000000',
  total_rewards: '0',
  unbonding: '0',
  validator_claimable_rewards: '1000000000',
  validator_rewards: '0', // validator rewards
  website: null,
  block_rate: 0,
  role: 0,
};
