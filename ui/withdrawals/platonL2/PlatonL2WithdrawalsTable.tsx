import { Table, Tbody, Th, Tr } from '@chakra-ui/react';
import React from 'react';

import type { PlatonL2WithdrawalsItem } from 'types/api/platonL2';

import { default as Thead } from 'ui/shared/TheadSticky';

import PlatonL2WithdrawalsTableItem from './PlatonL2WithdrawalsTableItem';

 type Props = {
   items: Array<PlatonL2WithdrawalsItem>;
   top: number;
   isLoading?: boolean;
 }

const PlatonL2WithdrawalsTable = ({ items, top, isLoading }: Props) => {
  return (
    <Table variant="simple" size="sm" style={{ tableLayout: 'auto' }} minW="950px">
      <Thead top={ top }>
        <Tr>
          <Th>Msg nonce</Th>
          <Th>From</Th>
          <Th>L2 txn hash</Th>
          <Th>Age</Th>
          <Th>Status</Th>
          <Th>L1 txn hash</Th>
          <Th>Time left</Th>
        </Tr>
      </Thead>
      <Tbody>
        { items.map((item, index) => (
          <PlatonL2WithdrawalsTableItem
            key={ String(item.msg_nonce_version) + item.msg_nonce + (isLoading ? index : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </Tbody>
    </Table>
  );
};

export default PlatonL2WithdrawalsTable;
