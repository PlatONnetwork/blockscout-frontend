import { Td, Tr, Skeleton, Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { PlatonAppchainWithdrawalsBatchesItem } from 'types/api/platonAppchain';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BlockEntityL1 from 'ui/shared/entities/block/BlockEntityL1';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShorten from 'ui/shared/HashStringShorten';

const rollupFeature = config.features.rollup;

type Props = { item: PlatonAppchainWithdrawalsBatchesItem; isLoading?: boolean };

const PlatonAppchainTxnBatchesTableItem = ({ item, isLoading }: Props) => {
  const timeAgo = dayjs(item.block_timestamp).fromNow();

  if (!rollupFeature.isEnabled || rollupFeature.type !== 'platonappchain') {
    return null;
  }

  return (
    <Tr>
      <Td verticalAlign="middle" fontWeight={ 600 }>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ item.no }</Skeleton>
      </Td>
      <Td>
        <BlockEntityL1
          isLoading={ isLoading }
          number={ item.l1_block }
          fontSize="sm"
          lineHeight={ 5 }
          fontWeight={ 600 }
          noIcon
        />
      </Td>
      <Td verticalAlign="middle">
        { item.l1_state_batches_hash ? (
          <TxEntityL1
            isLoading={ isLoading }
            hash={ item.l1_state_batches_hash }
            truncation="constant_long"
            noIcon
            fontSize="sm"
            lineHeight={ 5 }
          />
        ) :
          'N/A'
        }
      </Td>
      <Td verticalAlign="middle">
        { item.batch_root ? (
          <Flex overflow="hidden" w="100%" alignItems="center">
            <Skeleton isLoaded={ !isLoading }>
              <HashStringShorten hash={ item.batch_root } type="long"/>
            </Skeleton>
            <CopyToClipboard text={ item.batch_root } ml={ 2 } isLoading={ isLoading }/>
          </Flex>
        ) :
          'N/A'
        }
      </Td>
      <Td>
        <Skeleton isLoaded={ !isLoading } color="text_secondary" my={ 1 } display="inline-block">
          <span>{ item.l2_txns }</span>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        { item.submitter ? (
          <AddressEntity
            address={{ hash: item.submitter, name: '', is_contract: false, is_verified: false, implementation_name: '', ens_domain_name: null }}
            isLoading={ isLoading }
            truncation="constant"
          />
        ) : 'N/A' }
      </Td>
      <Td>
        <Skeleton isLoaded={ !isLoading } color="text_secondary" my={ 1 } display="inline-block">
          <span>{ BigNumber(item.tx_fee).div(BigNumber(10 ** 18)).toFormat() }</span>
        </Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={ !isLoading } color="text_secondary" my={ 1 } display="inline-block">
          <span>{ timeAgo }</span>
        </Skeleton>
      </Td>
    </Tr>
  );
};

export default PlatonAppchainTxnBatchesTableItem;
