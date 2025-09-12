import { useRouter } from 'next/router';
import React from 'react';

import { WITHDRAWAL_TX_TYPE } from 'types/api/platonAppchain';
import type { RoutedTab } from 'ui/shared/Tabs/types';

import useApiQuery from 'lib/api/useApiQuery';
import { useAppContext } from 'lib/contexts/app';
import throwOnAbsentParamError from 'lib/errors/throwOnAbsentParamError';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import useIsMobile from 'lib/hooks/useIsMobile';
import getQueryParamString from 'lib/router/getQueryParamString';
import TextAd from 'ui/shared/ad/TextAd';
import PageTitle from 'ui/shared/Page/PageTitle';
import Pagination from 'ui/shared/pagination/Pagination';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';
import TabsSkeleton from 'ui/shared/Tabs/TabsSkeleton';
import PlatonAppchainTxnBatchDetails from 'ui/txnBatches/platonAppchain/PlatonAppchainTxnBatchDetails';
import TxsWithFrontendSorting from 'ui/txs/TxsWithFrontendSorting';

const TAB_LIST_PROPS = {
  marginBottom: 0,
  py: 5,
  marginTop: -5,
};

const PlatonAppchainTxnBatch = () => {
  const router = useRouter();
  const appProps = useAppContext();
  const number = getQueryParamString(router.query.number);
  const tab = getQueryParamString(router.query.tab);
  // const startBlock = getQueryParamString(router.query.start_block);
  // const endBlock = getQueryParamString(router.query.end_block);
  const isMobile = useIsMobile();

  const batchQuery = useApiQuery('platonappchain_withdrawals_batch', {
    pathParams: { number },
    queryOptions: {
      enabled: Boolean(number),
    },
  });

  const startBlock = batchQuery.data?.items?.start_block_number;
  const endBlock = batchQuery.data?.items?.end_block_number;

  const batchTxsQuery = useQueryWithPages({
    resourceName: 'platonappchain_withdrawals_batch_txs',
    filters: { start_block_number: startBlock, end_block_number: endBlock },
    options: {},
  });

  if (batchTxsQuery.status === 'success' && batchTxsQuery.data) {
    const items = batchTxsQuery?.data?.items.map(item => {
      if (typeof item.method === 'number') {
        return {
          ...item,
          method: WITHDRAWAL_TX_TYPE[Number(item.method) - 1],
        };
      } else {
        return item;
      }
    });
    batchTxsQuery.data.items = items;
  }

  throwOnAbsentParamError(number);
  throwOnResourceLoadError(batchQuery);

  const tabs: Array<RoutedTab> = React.useMemo(() => ([
    { id: 'index', title: 'Details', component: <PlatonAppchainTxnBatchDetails query={ batchQuery }/> },
    { id: 'txs', title: 'Transactions', component: <TxsWithFrontendSorting query={ batchTxsQuery } showSocketInfo={ false }/> },
  ].filter(Boolean)), [ batchQuery, batchTxsQuery ]);

  const backLink = React.useMemo(() => {
    const hasGoBackLink = appProps.referrer && appProps.referrer.endsWith('/batches');

    if (!hasGoBackLink) {
      return;
    }

    return {
      label: 'Back to tx batches list',
      url: appProps.referrer,
    };
  }, [ appProps.referrer ]);

  const hasPagination = !isMobile && batchTxsQuery.pagination.isVisible && tab === 'txs';

  return (
    <>
      <TextAd mb={ 6 }/>
      <PageTitle
        title={ `Tx batch #${ number }` }
        backLink={ backLink }
      />
      { batchQuery.isPlaceholderData ?
        <TabsSkeleton tabs={ tabs }/> : (
          <RoutedTabs
            tabs={ tabs }
            tabListProps={ isMobile ? undefined : TAB_LIST_PROPS }
            rightSlot={ hasPagination ? <Pagination { ...(batchTxsQuery.pagination) }/> : null }
            stickyEnabled={ hasPagination }
          />
        ) }
    </>
  );
};

export default PlatonAppchainTxnBatch;
