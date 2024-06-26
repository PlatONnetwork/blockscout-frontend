import type { ValidatorAction, ValidatorBlock, ValidatorDelegator, ValidatorStaking, ValidatorResponse } from 'types/api/validator';

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
  lock_block: 0,
  status: 0,
};

export const VALIDATOR_STAKING: ValidatorStaking = {
  amount: '1000000000',
  block_number: 1639,
  block_timestamp: '2024-02-27T09:06:08.000000Z',
  tx_hash: '0x422aae14bfa4bf2f132d4bc467e647e261bbb1e912d40b58f206ed1b77505be1',
};

export const VALIDATOR_BLOCK: ValidatorBlock = {
  block_number: 50358,
  block_reward: '4000000000000000000',
  block_timestamp: '2024-05-16T03:05:07.620000Z',
  gas_used: '22718',
  gas_used_percentage: 0.011268849206349206,
  tx_fee_reward: '0',
  txn: 997,
};

export const VALIDATOR_ACTION: ValidatorAction = {
  action_desc: null,
  block_number: 1639,
  block_timestamp: '2024-02-27T09:06:08.000000Z',
  tx_hash: '0x6a7542f517f5a552bad7398a0eb4406bfbb60cbb0037719815526e02750c96ad',
};

export const VALIDATOR_DELEGATOR: ValidatorDelegator = {
  amount: '1000000000',
  delegator_address: '0x1dd26dfb60b996fd5d5152af723949971d9119ee',
  percentage: '待处理',
};
