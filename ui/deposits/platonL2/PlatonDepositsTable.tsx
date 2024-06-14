import { Table, Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';

import type { PlatonL2DepositsItem } from 'types/api/platonL2';

import { default as Thead } from 'ui/shared/TheadSticky';

import PlatonDepositsTableItem from './PlatonDepositsListItem';

 type Props = {
   items: Array<PlatonL2DepositsItem>;
   top: number;
   isLoading?: boolean;
 }

const PlatonDepositsTable = ({ items, top, isLoading }: Props) => {
  return (
    <Table variant="simple" size="sm" style={{ tableLayout: 'auto' }} minW="950px">
      <Thead top={ top }>
        <Tr>
          <Th>L1 block No</Th>
          <Th>L2 txn hash</Th>
          <Th>Age</Th>
          <Th>L1 txn hash</Th>
          <Th>L1 txn origin</Th>
          <Th isNumeric>Gas limit</Th>
        </Tr>
      </Thead>
      <Tbody>
        { items.map((item, index) => (
          <PlatonDepositsTableItem key={ item.l2_tx_hash + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
        )) }
      </Tbody>
    </Table>
  );
};

export default PlatonDepositsTable;
