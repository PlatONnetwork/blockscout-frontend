import { Tr, Td, Skeleton, Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { ValidatorDelegator, ValidatorResponse } from 'types/api/validator';

import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import Utilization from 'ui/shared/Utilization/Utilization';
import { currencyAmountFormatter } from 'ui/shared/validator/utils';

interface Props {
  data: ValidatorDelegator;
  validatorDetail: ValidatorResponse;
  isLoading?: boolean;
}

const ValidatorDelegatorTableItem = ({ data, isLoading, validatorDetail }: Props) => {
  return (
    <Tr>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <AddressEntity address={{ hash: data.delegator_address }} isLoading={ isLoading } noIcon noCopy={ false }/>
        </Skeleton>
      </Td>

      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { currencyAmountFormatter(data.amount) }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Flex justifyContent="flex-end">
          <Utilization
            colorScheme="gray"
            value={ new BigNumber(data.amount).div(validatorDetail.total_bonded).toString() }
            isLoading={ isLoading }
          />
        </Flex>
      </Td>

    </Tr>
  );
};

export default React.memo(ValidatorDelegatorTableItem);
