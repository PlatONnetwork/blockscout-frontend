import { Tr, Td, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import type { HistoricalValidator } from 'types/api/validators';

import dayjs from 'lib/date/dayjs';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import ValidatorHistoryStatus from 'ui/shared/statusTag/ValidatorHistoryStatus';

interface Props {
  data: HistoricalValidator;
  isLoading?: boolean;
}

const ValidatorsHistoryTableItem = ({ data, isLoading }: Props) => {
  return (
    <Tr>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { data.no }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <AddressEntity
          address={{ hash: data.validators || '' }}
          isLoading={ isLoading }
          truncation="constant"
        />
      </Td>
      <Td verticalAlign="middle">
        <ValidatorHistoryStatus status={ data.status } isLoading={ isLoading }/>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <VStack align="left">
            <Text>{ data.exit_block }</Text>
            <Text color="#999">{ dayjs(data.exit_timestamp).fromNow() }</Text>
          </VStack>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        { data.event }
      </Td>
    </Tr>
  );
};

export default React.memo(ValidatorsHistoryTableItem);
