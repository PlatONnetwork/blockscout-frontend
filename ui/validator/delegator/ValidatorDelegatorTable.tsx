import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { ValidatorDelegator, ValidatorResponse } from 'types/api/validator';

import { default as Thead } from 'ui/shared/TheadSticky';

import ValidatorDelegatorTableItem from './ValidatorDelegatorTableItem';

interface Props {
  data: Array<ValidatorDelegator>;
  validatorDetail: ValidatorResponse;
  isLoading?: boolean;

}
const ValidatorDelegatorTable = ({ data, validatorDetail, isLoading }: Props) => {
  return (
    <Table variant="simple" minWidth="830px" size="sm">
      <Thead top={ 76 }>
        <Tr>
          <Th width={ 650 }>Delegator Address</Th>
          <Th>Delegations</Th>
          <Th isNumeric>Percentage</Th>
        </Tr>
      </Thead>
      <Tbody>
        <AnimatePresence initial={ false }>
          { data.map((item, index) => (
            <ValidatorDelegatorTableItem
              key={ String(item.delegator_address) + (isLoading ? index : '') }
              data={ item }
              validatorDetail={ validatorDetail }
              isLoading={ isLoading }/>
          )) }
        </AnimatePresence>
      </Tbody>
    </Table>
  );
};

export default ValidatorDelegatorTable;
