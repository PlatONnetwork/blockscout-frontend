import { Flex, Skeleton } from '@chakra-ui/react';
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
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';

const rollupFeature = config.features.rollup;

type Props = { item: PlatonAppchainDepositsItem; isLoading?: boolean };

const PlatonAppchainDepositsListItem = ({ item, isLoading }: Props) => {
  const timeAgo = dayjs(item.block_timestamp).fromNow();

  if (!rollupFeature.isEnabled || rollupFeature.type !== 'platonappchain') {
    return null;
  }

  return (
    <ListItemMobileGrid.Container>

      <ListItemMobileGrid.Label isLoading={ isLoading }>No</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ item.no }</Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>L1 block Number</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BlockEntityL1
          number={ item.l1_block_number }
          isLoading={ isLoading }
          fontSize="sm"
          lineHeight={ 5 }
          fontWeight={ 600 }
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>L1 txn hash</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TxEntityL1
          isLoading={ isLoading }
          hash={ item.l1_txn_hash }
          fontSize="sm"
          lineHeight={ 5 }
          truncation="constant_long"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>L2 txn hash</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TxEntity
          isLoading={ isLoading }
          hash={ item.l2_event_hash }
          fontSize="sm"
          lineHeight={ 5 }
          truncation="constant_long"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Value</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ BigNumber(item.l1_amount).div(BigNumber(10 ** 18)).toFormat() }</Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Age</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ timeAgo }</Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>State batches txn hash</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TxEntity
          isLoading={ isLoading }
          hash={ item.state_batches_txn_hash }
          fontSize="sm"
          lineHeight={ 5 }
          truncation="constant_long"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>State root</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Flex overflow="hidden" whiteSpace="nowrap" alignItems="center" w="100%" justifyContent="start">
          <Skeleton isLoaded={ !isLoading } color="text_secondary">
            <HashStringShorten hash={ item.state_root } type="long"/>
          </Skeleton>
          <CopyToClipboard text={ item.state_root } isLoading={ isLoading }/>
        </Flex>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Status</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ STATUSES[item.status] }</Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Type</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ DEPOSIT_TX_TYPE[ Number(item.tx_type) - 1 ] }</Skeleton>
      </ListItemMobileGrid.Value>

    </ListItemMobileGrid.Container>
  );
};

export default PlatonAppchainDepositsListItem;
