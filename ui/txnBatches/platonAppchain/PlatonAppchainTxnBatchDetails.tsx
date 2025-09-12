import { Grid, GridItem, Link, Skeleton, Text } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import React from 'react';
import { scroller, Element } from 'react-scroll';

import { type PlatonAppchainWithdrawalsBatch } from 'types/api/platonAppchain';

import type { ResourceError } from 'lib/api/resources';
import { WEI, WEI_IN_GWEI } from 'lib/consts';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import { currencyUnits } from 'lib/units';
import isCustomAppError from 'ui/shared/AppError/isCustomAppError';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import DetailsInfoItem from 'ui/shared/DetailsInfoItem';
import DetailsInfoItemDivider from 'ui/shared/DetailsInfoItemDivider';
import DetailsTimestamp from 'ui/shared/DetailsTimestamp';
import PrevNext from 'ui/shared/PrevNext';
import TruncatedValue from 'ui/shared/TruncatedValue';

interface Props {
  query: UseQueryResult<PlatonAppchainWithdrawalsBatch, ResourceError>;
}

const PlatonAppchainTxnBatchDetails = ({ query }: Props) => {
  const router = useRouter();
  const [ isExpanded, setIsExpanded ] = React.useState(false);

  const { data, isPlaceholderData, isError, error } = query;

  const item = data?.items;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handlePrevNextClick = React.useCallback((direction: 'prev' | 'next') => {
    if (!item) {
      return;
    }

    const increment = direction === 'next' ? +1 : -1;
    const nextId = String(item.epoch + increment);

    router.push({ pathname: '/batches/[number]', query: { number: nextId, tab: 'index' } }, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ item, router ]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleCutClick = React.useCallback(() => {
    setIsExpanded((flag) => !flag);
    scroller.scrollTo('PlatonAppchainTxnBatchDetails__cutLink', {
      duration: 500,
      smooth: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    if (isCustomAppError(error)) {
      throwOnResourceLoadError({ isError, error });
    }

    return <DataFetchAlert/>;
  }

  if (!item) {
    return null;
  }

  // const txNum = data.l2_tx_count + data.l1_tx_count;

  return (
    <Grid
      columnGap={ 8 }
      rowGap={{ base: 3, lg: 3 }}
      templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(min-content, 200px) minmax(0, 1fr)' }}
      overflow="hidden"
    >
      <DetailsInfoItem
        title="Tx batch number"
        hint="Batch number indicates the length of batches produced by grouping L2 blocks to be proven on PlatON."
        isLoading={ isPlaceholderData }
      >
        <Skeleton isLoaded={ !isPlaceholderData }>
          { item.epoch }
        </Skeleton>
        <PrevNext
          ml={ 6 }
          onClick={ handlePrevNextClick }
          prevLabel="View previous tx batch"
          nextLabel="View next tx batch"
          isPrevDisabled={ item.epoch === 0 }
          isLoading={ isPlaceholderData }
        />
      </DetailsInfoItem>

      <DetailsInfoItem
        title="Block range"
        hint="Start block number - End block number"
        isLoading={ isPlaceholderData }
      >
        { item.start_block_number?.toString() + '-' + item.end_block_number?.toString() }
      </DetailsInfoItem>

      <DetailsInfoItem
        title="From"
        hint="commiter address at which batch is produced"
        isLoading={ isPlaceholderData }
      >
        <TruncatedValue value={ item.from }/>
        <CopyToClipboard text={ item.from }/>
      </DetailsInfoItem>

      <DetailsInfoItem
        title="Hash"
        hint="Block hash which batch is produced"
        flexWrap="nowrap"
        alignSelf="flex-start"
      >
        <TruncatedValue value={ item.hash }/>
        <CopyToClipboard text={ item.hash }/>
      </DetailsInfoItem>

      <DetailsInfoItem
        title="Timestamp"
        hint="Date and time at which batch is produced"
        isLoading={ isPlaceholderData }
      >
        { item.block_timestamp ? <DetailsTimestamp timestamp={ item.block_timestamp } isLoading={ isPlaceholderData }/> : 'Undefined' }
      </DetailsInfoItem>

      <DetailsInfoItemDivider/>

      <GridItem colSpan={{ base: undefined, lg: 2 }}>
        <Element name="PlatonAppchainTxnBatchDetails__cutLink">
          <Skeleton isLoaded={ !isPlaceholderData } mt={ 6 } display="inline-block">
            <Link
              display="inline-block"
              fontSize="sm"
              textDecorationLine="underline"
              textDecorationStyle="dashed"
              onClick={ handleCutClick }
            >
              { isExpanded ? 'Hide details' : 'View details' }
            </Link>
          </Skeleton>
        </Element>
      </GridItem>

      { isExpanded && (
        <>
          <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>

          <DetailsInfoItem
            title="State Root hash"
            hint="L1 batch root is a hash that summarizes batch data and submitted to the L1"
            flexWrap="nowrap"
            alignSelf="flex-start"
          >
            <TruncatedValue value={ item.state_root }/>
            <CopyToClipboard text={ item.state_root }/>
          </DetailsInfoItem>

          <DetailsInfoItem
            title="Tx fee"
            hint="Transaction fee for the batch settlement transaction on L1"
          >
            <Text mr={ 1 }>{ BigNumber(item.tx_fee).dividedBy(WEI).toFixed() } { currencyUnits.ether }</Text>
            <Text variant="secondary">({ BigNumber(item.tx_fee).dividedBy(WEI_IN_GWEI).toFixed() } { currencyUnits.gwei })</Text>
          </DetailsInfoItem>
        </>
      ) }
    </Grid>
  );
};

export default PlatonAppchainTxnBatchDetails;
