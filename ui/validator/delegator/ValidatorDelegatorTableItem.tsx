import { Tr, Td, Skeleton, Flex } from '@chakra-ui/react';
import React from 'react';

import type { ValidatorDelegator } from 'types/api/validator';

import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import Utilization from 'ui/shared/Utilization/Utilization';

interface Props {
  data: ValidatorDelegator;
  isLoading?: boolean;
}

const ValidatorDelegatorTableItem = ({ data, isLoading }: Props) => {
  return (
    <Tr>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <AddressEntity address={{ hash: data.delegator_address }} isLoading={ isLoading } noIcon noCopy={ false }/>
        </Skeleton>
      </Td>

      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { data.amount }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Flex justifyContent="flex-end">
          <Utilization
            colorScheme="gray"
            value={ data.percentage }
            isLoading={ isLoading }
          />
        </Flex>
      </Td>

    </Tr>
  );
};

export default React.memo(ValidatorDelegatorTableItem);
