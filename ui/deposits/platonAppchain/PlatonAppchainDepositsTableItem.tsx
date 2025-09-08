import { Td, Tr, Skeleton, Flex } from '@chakra-ui/react';
import React from 'react';

import type { PlatonAppchainDepositsItem } from 'types/api/platonAppchain';
import { DEPOSIT_TX_TYPE, STATUSES } from 'types/api/platonAppchain';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';

import CopyToClipboard from '../../shared/CopyToClipboard';
import HashStringShorten from '../../shared/HashStringShorten';

const rollupFeature = config.features.rollup;

type Props = { item: PlatonAppchainDepositsItem; isLoading?: boolean };

const PlatonAppchainDepositsTableItem = ({ item, isLoading }: Props) => {
  const timeAgo = dayjs(item.block_timestamp).fromNow();

  if (!rollupFeature.isEnabled || rollupFeature.type !== 'platonappchain') {
    return null;
  }

  return (
    <Tr>
      <Td verticalAlign="middle">
        <TxEntityL1
          isLoading={ isLoading }
          hash={ item.l1_txn_hash }
          fontSize="sm"
          lineHeight={ 5 }
          truncation="constant_long"
          noIcon
        />
      </Td>
      <Td verticalAlign="middle">
        <TxEntity
          isLoading={ isLoading }
          hash={ item.l2_event_hash }
          truncation="constant_long"
          noIcon
          fontSize="sm"
          lineHeight={ 5 }
        />
      </Td>
      <Td verticalAlign="middle" pr={ 12 }>
        <Skeleton isLoaded={ !isLoading } color="text_secondary" display="inline-block"><span>{ timeAgo }</span></Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } color="text_secondary" display="inline-block">
          <span>{ item.state_batches_index }</span>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <TxEntity
          isLoading={ isLoading }
          hash={ item.state_batches_txn_hash }
          truncation="constant_long"
          noIcon
          fontSize="sm"
          lineHeight={ 5 }
        />
      </Td>
      <Td verticalAlign="middle">
        <Flex overflow="hidden" w="100%" alignItems="center">
          <Skeleton isLoaded={ !isLoading }>
            <HashStringShorten hash={ item.state_root } type="long"/>
          </Skeleton>
          <CopyToClipboard text={ item.state_root } ml={ 2 } isLoading={ isLoading }/>
        </Flex>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } color="text_secondary" display="inline-block">
          <span>{ STATUSES[item.status] }</span>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } color="text_secondary" display="inline-block">
          <span>{ DEPOSIT_TX_TYPE[Number(item.tx_type) - 1] }</span>
        </Skeleton>
      </Td>
    </Tr>
  );
};

export default PlatonAppchainDepositsTableItem;
