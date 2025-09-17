import { Table, Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';

import type { PlatonAppchainDepositsItem } from 'types/api/platonAppchain';

import { default as Thead } from 'ui/shared/TheadSticky';

import PlatonAppchainDepositsTableItem from './PlatonAppchainDepositsTableItem';

type Props = {
  items: Array<PlatonAppchainDepositsItem>;
  top: number;
  isLoading?: boolean;
}

const PlatonAppchainDepositsTable = ({ items, top, isLoading }: Props) => {
  return (
    <Table variant="simple" size="sm" style={{ tableLayout: 'auto' }} minW="950px">
      <Thead top={ top }>
        <Tr>
          <Th>No</Th>
          <Th>L1 block number</Th>
          <Th>L1 txn hash</Th>
          <Th>L2 txn hash</Th>
          <Th> Value </Th>
          <Th>Age</Th>
          <Th>State batches txn hash</Th>
          <Th>State root</Th>
          <Th>Status</Th>
          <Th>Type</Th>
        </Tr>
      </Thead>
      <Tbody>
        { items.map((item, index) => (
          <PlatonAppchainDepositsTableItem key={ String(item.no) + item.state_batches_index + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
        )) }
      </Tbody>
    </Table>
  );
};

export default PlatonAppchainDepositsTable;
