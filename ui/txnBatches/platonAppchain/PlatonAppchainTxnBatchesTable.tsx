import { Table, Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';

import type { PlatonAppchainWithdrawalsBatchesItem } from 'types/api/platonAppchain';

import { default as Thead } from 'ui/shared/TheadSticky';

import PlatonAppchainTxnBatchesTableItem from './PlatonAppchainTxnBatchesTableItem';

type Props = {
  items: Array<PlatonAppchainWithdrawalsBatchesItem>;
  top: number;
  isLoading?: boolean;
}

const PlatonAppchainTxnBatchesTable = ({ items, top, isLoading }: Props) => {
  return (
    <Table variant="simple" size="sm" minW="850px">
      <Thead top={ top }>
        <Tr>
          <Th width="60px">NO</Th>
          <Th width="170px">L1 block #</Th>
          <Th width="170px">L1 txn hash</Th>
          <Th width="170px">Batch root</Th>
          <Th width="60px">L2 txns</Th>
          <Th width="170px">Submitter</Th>
          <Th width="150px">Tx fee</Th>
          <Th width="80px">Age</Th>
        </Tr>
      </Thead>
      <Tbody>
        { items.map((item, index) => (
          <PlatonAppchainTxnBatchesTableItem
            key={ item.l1_block + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </Tbody>
    </Table>
  );
};

export default PlatonAppchainTxnBatchesTable;
