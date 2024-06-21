import { Tr, Td, Skeleton, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import type { ValidatorBlock } from 'types/api/validator';

import dayjs from 'lib/date/dayjs';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import Utilization from 'ui/shared/Utilization/Utilization';
import { currencyAmountFormatter, formatNumberValue, toLocaleStringFormatter } from 'ui/shared/validator/utils';

interface Props {
  data: ValidatorBlock;
  isLoading?: boolean;
}

const ValidatorBlocksTableItem = ({ data, isLoading }: Props) => {
  const ageColor = useColorModeValue('gray.500', 'gray.300');
  return (
    <Tr>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <BlockEntity number={ data.block_number } isLoading={ isLoading } noIcon/>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" color={ ageColor }>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { dayjs(data.block_timestamp).fromNow() }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { Number(data.txn).toLocaleString() }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <HStack gap="10px">
          <Skeleton isLoaded={ !isLoading } display="inline-block">
            <Text>
              { formatNumberValue(data.gas_used, toLocaleStringFormatter) }
            </Text>
          </Skeleton>
          <Utilization
            colorScheme="gray"
            value={ data.gas_used_percentage }
            isLoading={ isLoading }
          />

        </HStack>
      </Td>
      <Td verticalAlign="middle" isNumeric>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { currencyAmountFormatter(data.tx_fee_reward) }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" isNumeric>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { currencyAmountFormatter(data.block_reward) }
        </Skeleton>
      </Td>
    </Tr>
  );
};

export default React.memo(ValidatorBlocksTableItem);
