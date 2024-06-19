import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { ValidatorStaking } from 'types/api/validator';

import config from 'configs/app';
import { default as Thead } from 'ui/shared/TheadSticky';

import ValidatorStakingTableItem from './ValidatorStakingTableItem';

interface Props {
  data: Array<ValidatorStaking>;
  isLoading?: boolean;

}
const ValidatorStakingTable = ({ data, isLoading }: Props) => {
  return (
    <Table variant="simple" minWidth="830px" size="sm">
      <Thead top={ 76 }>
        <Tr>
          <Th>TxHash</Th>
          <Th>Age</Th>
          <Th>Block</Th>
          <Th>Amount { config.chain.currency.symbol }</Th>
        </Tr>
      </Thead>
      <Tbody>
        <AnimatePresence initial={ false }>
          { data.map((item, index) => (
            <ValidatorStakingTableItem
              key={ String(item.tx_hash) + (isLoading ? index : '') }
              data={ item }
              isLoading={ isLoading }/>
          )) }
        </AnimatePresence>
      </Tbody>
    </Table>
  );
};

export default ValidatorStakingTable;
