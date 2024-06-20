import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { ValidatorAction } from 'types/api/validator';

import { default as Thead } from 'ui/shared/TheadSticky';

import ValidatorActionTableItem from './ValidatorActionTableItem';

interface Props {
  data: Array<ValidatorAction>;
  isLoading?: boolean;

}
const ValidatorActionTable = ({ data, isLoading }: Props) => {
  return (
    <Table variant="simple" minWidth="830px" size="sm">
      <Thead top={ 76 }>
        <Tr>
          <Th width={ 650 }>TxHash</Th>
          <Th>Age</Th>
          <Th>Block</Th>
          <Th isNumeric>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        <AnimatePresence initial={ false }>
          { data.map((item, index) => (
            <ValidatorActionTableItem
              key={ String(item.tx_hash) + (isLoading ? index : '') }
              data={ item }
              isLoading={ isLoading }/>
          )) }
        </AnimatePresence>
      </Tbody>
    </Table>
  );
};

export default ValidatorActionTable;
