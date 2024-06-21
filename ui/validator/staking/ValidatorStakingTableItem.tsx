import { Tr, Td, Skeleton, useColorModeValue, Text } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { ValidatorStaking } from 'types/api/validator';

import dayjs from 'lib/date/dayjs';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import { currencyAmountFormatter } from 'ui/shared/validator/utils';

interface Props {
  data: ValidatorStaking;
  isLoading?: boolean;
}

const ValidatorStakingTableItem = ({ data, isLoading }: Props) => {
  const ageColor = useColorModeValue('gray.500', 'gray.300');
  return (
    <Tr>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <TxEntity hash={ data.tx_hash } isLoading={ isLoading } noIcon noCopy={ false }/>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" color={ ageColor }>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { dayjs(data.block_timestamp).fromNow() }
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <BlockEntity number={ data.block_number } isLoading={ isLoading } noIcon/>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" isNumeric>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { !Number.isNaN(Number(data.amount)) ? (
            <Text fontWeight={ 600 } color={ Number(data.amount) > 0 ? 'green.500' : 'red.500' }>
              { new BigNumber(data.amount).gte(0) ? '+' : '-' }{ ' ' }{ currencyAmountFormatter(data.amount) }
            </Text>
          ) : '-' }
        </Skeleton>
      </Td>

    </Tr>
  );
};

export default React.memo(ValidatorStakingTableItem);
