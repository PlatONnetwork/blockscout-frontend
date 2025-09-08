import { Td, Tr, Skeleton, Flex } from '@chakra-ui/react';
import React from 'react';

import type { PlatonAppchainWithdrawalsItem } from 'types/api/platonAppchain';
import { WITHDRAWAL_TX_TYPE, STATUSES } from 'types/api/platonAppchain';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';

import CopyToClipboard from '../../shared/CopyToClipboard';
import HashStringShorten from '../../shared/HashStringShorten';

const rollupFeature = config.features.rollup;

 type Props = { item: PlatonAppchainWithdrawalsItem; isLoading?: boolean };

const PlatonAppchainWithdrawalsTableItem = ({ item, isLoading }: Props) => {
  const timeAgo = item.block_timestamp ? dayjs(item.block_timestamp).fromNow() : 'N/A';

  if (!item) {
    return null;
  }

  if (!rollupFeature.isEnabled || rollupFeature.type !== 'platonappchain') {
    return null;
  }

  return (
    <Tr>
      <Td verticalAlign="middle" fontWeight={ 600 }>
        <Skeleton isLoaded={ !isLoading } display="inline-block">{ item.state_batches_index }</Skeleton>
      </Td>
      <Td verticalAlign="middle">
        { item.from ? (
          <AddressEntity
            address={{ hash: item.from, name: '', is_contract: false, is_verified: false, implementation_name: '', ens_domain_name: null }}
            isLoading={ isLoading }
            truncation="constant"
          />
        ) : 'N/A' }
      </Td>
      <Td verticalAlign="middle">
        { item.l1_txn_hash ? (
          <TxEntityL1
            isLoading={ isLoading }
            hash={ item.l1_txn_hash }
            fontSize="sm"
            lineHeight={ 5 }
            truncation="constant_long"
            noIcon
          />
        ) : 'N/A' }
      </Td>
      <Td verticalAlign="middle">
        { item.l2_txn_hash ? (
          <TxEntity
            isLoading={ isLoading }
            hash={ item.l2_txn_hash }
            fontSize="sm"
            lineHeight={ 5 }
            truncation="constant_long"
            noIcon
          />
        ) : 'N/A' }
      </Td>
      <Td verticalAlign="middle" pr={ 12 }>
        <Skeleton isLoaded={ !isLoading } color="text_secondary" display="inline-block">
          <span> { timeAgo }</span>
        </Skeleton>
      </Td>

      <Td verticalAlign="middle">
        { item.state_root ? (
          <Flex overflow="hidden" w="100%" alignItems="center">
            <Skeleton isLoaded={ !isLoading }>
              <HashStringShorten hash={ item.state_root } type="long"/>
            </Skeleton>
            <CopyToClipboard text={ item.state_root } ml={ 2 } isLoading={ isLoading }/>
          </Flex>
        ) :
          'N/A'
        }
      </Td>

      <Td verticalAlign="middle">
        { item.state_batches_txn_hash ? (
          <TxEntityL1
            isLoading={ isLoading }
            hash={ item.state_batches_txn_hash }
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
        <Skeleton isLoaded={ !isLoading } color="text_secondary" display="inline-block">
          <span>{ STATUSES[item.status] }</span>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={ !isLoading } color="text_secondary" display="inline-block">
          <span>{ WITHDRAWAL_TX_TYPE[Number(item.type) - 1] }</span>
        </Skeleton>
      </Td>
    </Tr>
  );
};

export default PlatonAppchainWithdrawalsTableItem;
