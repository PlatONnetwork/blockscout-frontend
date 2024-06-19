export interface ValidatorStaking {
  amount: string;
  block_number: number;
  block_timestamp: string;
  tx_hash: string;
}

export interface ValidatorBlock {
  block_number: number;
  block_reward: string;
  block_timestamp: string;
  gas_used: string;
  gas_used_percentage: number;
  tx_fee_reward: string;
  txn: number;
}

export interface ValidatorAction {
  action_desc: string | null;
  block_number: number;
  block_timestamp: string;
  tx_hash: string;
}

export interface ValidatorDelegator {
  amount: string;
  delegator_address: string | null;
  percentage: string;
}

export interface ValidatorStakingResponse {
  items: Array<ValidatorStaking>;
  next_page_params: {
    block_number: number;
    items_count: number;
  } | null;
}
export interface ValidatorBlocksResponse {
  items: Array<ValidatorBlock>;
  next_page_params: {
    block_number: number;
    items_count: number;
  } | null;
}
export interface ValidatorActionResponse {
  items: Array<ValidatorAction>;
  next_page_params: {
    block_number: number;
    items_count: number;
  } | null;
}
export interface ValidatorDelegatorResponse {
  items: Array<ValidatorDelegator>;
  next_page_params: {
    block_number: number;
    items_count: number;
  } | null;
}

export interface ValidatorFilters {
  validator_hash: string;
}
