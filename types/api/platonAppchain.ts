import type { AddressParam } from './addressParams';

export type PlatonAppchainDepositsItem = {
  block_timestamp: string;
  l1_amount: string;
  l1_block_number: number;
  l1_txn_hash: string;
  l2_event_hash: string;
  no: number;
  state_batches_index: string;
  state_batches_txn_hash: string;
  state_root: string;
  status: number;
  tx_type: number;
}

export type PlatonAppchainDepositsResponse = {
  items: Array<PlatonAppchainDepositsItem>;
  next_page_params: {
    items_count: number;
    no: number;
  };
}

export type PlatonAppchainDepositsBatchesItem = {
  batch_root: string;
  block_timestamp: string;
  index: string;
  l1_txns: number;
  l2_block: number;
  l2_state_batches_hash: string;
  submitter: string;
}

export type PlatonAppchainDepositsBatchesResponse = {
  items: Array<PlatonAppchainDepositsBatchesItem>;
  next_page_params: {
    items_count: number;
    number: number;
  };
}

export type PlatonAppchainWithdrawalsItem = {
  block_timestamp: string;
  epoch: number;
  from: AddressParam;
  l1_txn_hash: string;
  l2_txn_hash: string;
  l2_amount: string;
  no: number;
  state_batches_index: string;
  state_batches_txn_hash: string | null;
  state_root: string | null;
  status: number;
  type: number;
}

export type PlatonAppchainWithdrawalsResponse = {
  items: Array<PlatonAppchainWithdrawalsItem>;
  next_page_params: {
    items_count: number;
    no: number;
  };
}

export type PlatonAppchainWithdrawalsBatchesItem = {
  batch_root: string;
  block_timestamp: string;
  l1_block: number;
  l1_state_batches_hash: string;
  l2_txns: number;
  no: number;
  submitter: string;
  tx_fee: string;
}

export type PlatonAppchainWithdrawalsBatchesResponse = {
  items: Array<PlatonAppchainWithdrawalsBatchesItem>;
  next_page_params: {
    items_count: number;
    number: number;
  };
}

export const STATUSES = [
  'Waiting for state root',
  'Relayed',
  'fail',
];

// export type PlatonAppchainStatus = typeof STATUSES[number];

export const DEPOSIT_TX_TYPE = [
  'deposit',
  'stake',
  'addStake',
  'delegate',
];

export const WITHDRAWAL_TX_TYPE = [
  'withdraw',
  'stakeWithdraw',
  'degationWithdraw',
  'slash',
];
