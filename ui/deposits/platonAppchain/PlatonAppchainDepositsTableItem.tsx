import { Td, Tr, Skeleton, Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { PlatonAppchainDepositsItem } from 'types/api/platonAppchain';
import { DEPOSIT_TX_TYPE, STATUSES } from 'types/api/platonAppchain';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import BlockEntityL1 from 'ui/shared/entities/block/BlockEntityL1';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShorten from 'ui/shared/HashStringShorten';

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
        <Skeleton isLoaded={ !isLoading } color="text_secondary" display="inline-block">
          <span>{ item.no }</span>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <BlockEntityL1
          number={ item.l1_block_number }
          isLoading={ isLoading }
          fontSize="sm"
          lineHeight={ 5 }
          fontWeight={ 600 }
          noIcon
        />
      </Td>
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
        { item.l2_event_hash ? (
          <TxEntity
            isLoading={ isLoading }
            hash={ item.l2_event_hash }
            truncation="constant_long"
            noIcon
            fontSize="sm"
            lineHeight={ 5 }
          />
        ) : 'N/A' }
      </Td>
      <Td>
        <Skeleton isLoaded={ !isLoading } color="text_secondary" my={ 1 } display="inline-block">
          <span>{ BigNumber(item.l1_amount).div(BigNumber(10 ** 18)).toFormat() }</span>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle" pr={ 12 }>
        <Skeleton isLoaded={ !isLoading } color="text_secondary" display="inline-block"><span>{ timeAgo }</span></Skeleton>
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
