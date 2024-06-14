import type { Validator, ValidatorsCountersResponse } from 'types/api/validators';

export const VALIDATOR: Validator = {
  block_rate: null,
  commission: 0,
  delegate_amount: '0', //有效委托金额
  detail: null,
  expect_apr: null,
  locking_stake_amount: '0', //锁定的质押金额（解除的部分质押，需要锁定一段时间）
  logo: null,
  name: null,
  owner_hash: '0x1dd26dfb60b996fd5d5152af723949971d9119ee',
  rank: 1,
  role: 2, // 0-candidate(质押节点) 1-active(共识节点候选人) 2-verifying(共识节点)
  stake_amount: '1000000000', //有效质押金额
  stake_epoch: 0,
  stake_reward: '0',
  status: 0, // 0: 正常 1：无效 2：低出块 4: 低阈值 8: 双签 32：解质押 64:惩罚
  validators: '0x1dd26dfb60b996fd5d5152af723949971d9119ee',
  website: null,
  withdrawal_stake_amount: '0', //可提取的质押金额
};

export const VALIDATORS_COUNTERS: ValidatorsCountersResponse = {
  reward_pool: '待确认', total_bonded: '3000000000', total_bonded_24_hours: '3000000000', validators: 3, validators_24_hours: 3,
};
