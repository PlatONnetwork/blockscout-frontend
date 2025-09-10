import { Flex, Skeleton } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { PlatonAppchainWithdrawalsItem } from 'types/api/platonAppchain';
import { WITHDRAWAL_TX_TYPE, STATUSES } from 'types/api/platonAppchain';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShorten from 'ui/shared/HashStringShorten';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';

const rollupFeature = config.features.rollup;

type Props = { item: PlatonAppchainWithdrawalsItem; isLoading?: boolean };

const PlatonAppchainWithdrawalsListItem = ({ item, isLoading }: Props) => {
  const timeAgo = item.block_timestamp ? dayjs(item.block_timestamp).fromNow() : null;

  if (!item) {
    return null;
  }

  if (!rollupFeature.isEnabled || rollupFeature.type !== 'platonappchain') {
    return null;
  }

  return (
    <ListItemMobileGrid.Container>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Epoch</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">
          { item.epoch }
        </Skeleton>
      </ListItemMobileGrid.Value>

      { item.from && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>From</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <AddressEntity
              address={ item.from }
              isLoading={ isLoading }
              truncation="constant"
            />
          </ListItemMobileGrid.Value>
        </>
      ) }

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
          hash={ item.l2_txn_hash }
          fontSize="sm"
          lineHeight={ 5 }
          truncation="constant_long"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Value</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ BigNumber(item.l2_amount).div(BigNumber(10 ** 18)).toFormat() }</Skeleton>
      </ListItemMobileGrid.Value>

      { timeAgo && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>Age</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <Skeleton isLoaded={ !isLoading } display="inline-block">
              { timeAgo }
            </Skeleton>
          </ListItemMobileGrid.Value>
        </>
      ) }

      { item.state_root && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>state root</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <Flex overflow="hidden" whiteSpace="nowrap" alignItems="center" w="100%" justifyContent="start">
              <Skeleton isLoaded={ !isLoading } color="text_secondary">
                <HashStringShorten hash={ item.state_root } type="long"/>
              </Skeleton>
              <CopyToClipboard text={ item.state_root } isLoading={ isLoading }/>
            </Flex>
          </ListItemMobileGrid.Value>
        </>
      ) }
      { item.state_batches_txn_hash && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>State batches txn hash</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <TxEntityL1
              isLoading={ isLoading }
              hash={ item.state_batches_txn_hash }
              fontSize="sm"
              lineHeight={ 5 }
              truncation="constant_long"
            />
          </ListItemMobileGrid.Value>
        </>
      ) }

      <ListItemMobileGrid.Label isLoading={ isLoading }>status</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ STATUSES[item.status] }</Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>type</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ WITHDRAWAL_TX_TYPE[ Number(item.type) - 1 ] }</Skeleton>
      </ListItemMobileGrid.Value>
    </ListItemMobileGrid.Container>
  );
};

export default PlatonAppchainWithdrawalsListItem;
