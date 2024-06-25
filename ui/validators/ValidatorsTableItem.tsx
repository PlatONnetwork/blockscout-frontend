import { Tr, Td, Skeleton, Text, VStack } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { Validator, ValidatorsCountersResponse } from 'types/api/validators';

import ValidatorEntity from 'ui/shared/entities/validator/ValidatorEntity';
import ValidatorStatus from 'ui/shared/statusTag/ValidatorStatus';
import { currencyAmountFormatter } from 'ui/shared/validator/utils';

interface Props {
  data: Validator;
  counterData?: ValidatorsCountersResponse;
  isLoading?: boolean;
}

const ValidatorsTableItem = ({ data, counterData, isLoading }: Props) => {
  const totalBonded = new BigNumber(data.stake_amount).plus(data.delegate_amount);
  return (
    <Tr>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { data.rank }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <ValidatorEntity
          hash={ data.validators || '' }
          isLoading={ isLoading }
          truncation="constant_long"
          noCopy={ false }
        />
      </Td>
      <Td verticalAlign="middle">
        <ValidatorStatus state={ data.role } isLoading={ isLoading }/>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { String(data.commission) }%
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <VStack align="left">
            <Text>{ currencyAmountFormatter(totalBonded.toString()) }</Text>
            <Text color="#999">{ counterData?.total_bonded ? totalBonded.div(counterData.total_bonded).times(100).toFixed(2) : '-' }%</Text>
          </VStack>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" >
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { currencyAmountFormatter(data.delegate_amount) }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" isNumeric>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { Number(data.expect_apr) / 100 }%
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" isNumeric>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { Number(data.block_rate) / 100 }%

        </Skeleton>
      </Td>
    </Tr>
  );
};

export default React.memo(ValidatorsTableItem);
