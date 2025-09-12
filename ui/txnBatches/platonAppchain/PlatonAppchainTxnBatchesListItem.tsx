import { Flex, Skeleton } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { PlatonAppchainWithdrawalsBatchesItem } from 'types/api/platonAppchain';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BatchEntityL2 from 'ui/shared/entities/block/BatchEntityL2';
import BlockEntityL1 from 'ui/shared/entities/block/BlockEntityL1';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShorten from 'ui/shared/HashStringShorten';
import LinkInternal from 'ui/shared/LinkInternal';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';

const rollupFeature = config.features.rollup;

type Props = { item: PlatonAppchainWithdrawalsBatchesItem; isLoading?: boolean };

const PlatonAppchainTxnBatchesListItem = ({ item, isLoading }: Props) => {
  const timeAgo = dayjs(item.block_timestamp).fromNow();

  if (!rollupFeature.isEnabled || rollupFeature.type !== 'platonappchain') {
    return null;
  }

  return (
    <ListItemMobileGrid.Container gridTemplateColumns="100px auto">

      <ListItemMobileGrid.Label isLoading={ isLoading }>Epoch #</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BatchEntityL2
          isLoading={ isLoading }
          number={ item.no }
          fontSize="sm"
          lineHeight={ 5 }
          fontWeight={ 600 }
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>L1 block #</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value py="3px">
        <BlockEntityL1
          isLoading={ isLoading }
          number={ item.l1_block }
          fontSize="sm"
          lineHeight={ 5 }
          fontWeight={ 600 }
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>L1 txn hash</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TxEntityL1
          isLoading={ isLoading }
          hash={ item.l1_state_batches_hash }
          fontSize="sm"
          lineHeight={ 5 }
          truncation="constant_long"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Batch root</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Flex overflow="hidden" whiteSpace="nowrap" alignItems="center" w="100%" justifyContent="start">
          <Skeleton isLoaded={ !isLoading } color="text_secondary">
            <HashStringShorten hash={ item.batch_root } type="long"/>
          </Skeleton>
          <CopyToClipboard text={ item.batch_root } isLoading={ isLoading }/>
        </Flex>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>L2 txns</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <LinkInternal
          href={ route({ pathname: '/batches/[number]', query: { number: item.no.toString(), tab: 'txs' } }) }
          isLoading={ isLoading }
          fontWeight={ 600 }
        >
          <Skeleton isLoaded={ !isLoading } minW="40px">
            { item.l2_txns }
          </Skeleton>
        </LinkInternal>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Submitter</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <AddressEntity
          address={ item.submitter }
          isLoading={ isLoading }
          truncation="constant"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Tx fees</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ BigNumber(item.tx_fee).div(BigNumber(10 ** 18)).toFormat() }</Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>Age</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ timeAgo }</Skeleton>
      </ListItemMobileGrid.Value>

    </ListItemMobileGrid.Container>
  );
};

export default PlatonAppchainTxnBatchesListItem;
