import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { ValidatorBlock } from 'types/api/validator';

import config from 'configs/app';
import { default as Thead } from 'ui/shared/TheadSticky';

import ValidatorBlocksTableItem from './ValidatorBlocksTableItem';

interface Props {
  data: Array<ValidatorBlock>;
  isLoading?: boolean;

}
const ValidatorBlocksTable = ({ data, isLoading }: Props) => {
  return (
    <Table variant="simple" minWidth="830px" size="sm">
      <Thead top={ 76 }>
        <Tr>
          <Th>Block</Th>
          <Th>Age</Th>
          <Th>Txn</Th>
          <Th>Gas used</Th>
          <Th isNumeric>TxFee Reward { config.chain.currency.symbol }</Th>
          <Th isNumeric>Block Reward { config.chain.currency.symbol }</Th>
        </Tr>
      </Thead>
      <Tbody>
        <AnimatePresence initial={ false }>
          { data.map((item, index) => (
            <ValidatorBlocksTableItem
              key={ String(item.block_number) + (isLoading ? index : '') }
              data={ item }
              isLoading={ isLoading }/>
          )) }
        </AnimatePresence>
      </Tbody>
    </Table>
  );
};

export default ValidatorBlocksTable;
