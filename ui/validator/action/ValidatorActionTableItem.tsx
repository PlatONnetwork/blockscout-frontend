import { Tr, Td, Skeleton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import type { ValidatorAction } from 'types/api/validator';

import dayjs from 'lib/date/dayjs';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';

interface Props {
  data: ValidatorAction;
  isLoading?: boolean;
}

const ValidatorActionTableItem = ({ data, isLoading }: Props) => {
  const ageColor = useColorModeValue('gray.500', 'gray.300');
  return (
    <Tr>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          <TxEntity hash={ data.tx_hash } isLoading={ isLoading } noIcon/>
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
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { data.action_desc }
        </Skeleton>
      </Td>

    </Tr>
  );
};

export default React.memo(ValidatorActionTableItem);
