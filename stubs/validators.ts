import type { Validator, ValidatorsCountersResponse } from 'types/api/validators';

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
