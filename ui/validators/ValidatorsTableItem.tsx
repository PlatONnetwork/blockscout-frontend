import { Tr, Td, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import type { Validator } from 'types/api/validators';

import ValidatorEntity from 'ui/shared/entities/validator/ValidatorEntity';
import ValidatorStatus from 'ui/shared/statusTag/ValidatorStatus';
import { formatNumberValue, percentageFormatter, toLocaleStringFormatter } from 'ui/shared/validator/utils';

interface Props {
  data: Validator;
  isLoading?: boolean;
}

const ValidatorsTableItem = ({ data, isLoading }: Props) => {
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
          { formatNumberValue(data.commission, percentageFormatter) }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <VStack align="left">
            <Text>{ data.total_bonded_amount }</Text>
            <Text color="#999">{ formatNumberValue(data.total_bonded_percent, percentageFormatter) }</Text>
          </VStack>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" >
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { formatNumberValue(data.delegate_amount, toLocaleStringFormatter) }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" isNumeric>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { formatNumberValue(data.expect_apr, percentageFormatter) }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" isNumeric>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { formatNumberValue(data.block_rate, percentageFormatter) }

        </Skeleton>
      </Td>
    </Tr>
  );
};

export default React.memo(ValidatorsTableItem);
