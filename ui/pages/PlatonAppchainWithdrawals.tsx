import { Hide, Show, Skeleton } from '@chakra-ui/react';
import React from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import { rightLineArrow, nbsp } from 'lib/html-entities';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import StickyPaginationWithText from 'ui/shared/StickyPaginationWithText';
import PlatonAppchainWithdrawalsListItem from 'ui/withdrawals/platonAppchain/PlatonAppchainWithdrawalsListItem';
import PlatonAppchainWithdrawalsTable from 'ui/withdrawals/platonAppchain/PlatonAppchainWithdrawalsTable';

const PlatonAppchainWithdrawals = () => {
  const { data, isError, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: 'platonappchain_withdrawals',
    options: {},
  });

  const countersQuery = useApiQuery('platonappchain_withdrawals_count', {
    // queryOptions: {
    //   placeholderData: 10,
    // },
  });

  const content = data?.items ? (
    <>
      <Show below="lg" ssr={ false }>{ data.items.map(((item, index) => (
        <PlatonAppchainWithdrawalsListItem
          key={ String(item.no) + item.state_batches_index + (isPlaceholderData ? index : '') }
          item={ item }
          isLoading={ isPlaceholderData }
        />
      ))) }</Show>
      <Hide below="lg" ssr={ false }>
        <PlatonAppchainWithdrawalsTable items={ data.items } top={ pagination.isVisible ? ACTION_BAR_HEIGHT_DESKTOP : 0 } isLoading={ isPlaceholderData }/>
      </Hide>
    </>
  ) : null;

  const text = (() => {
    if (countersQuery.isError) {
      return null;
    }

    return (
      <Skeleton
        isLoaded={ !countersQuery.isPlaceholderData }
        display="inline-block"
      >
        A total of { countersQuery.data?.toLocaleString() } withdrawals found
      </Skeleton>
    );
  })();

  const actionBar = <StickyPaginationWithText text={ text } pagination={ pagination }/>;

  if (!content) {
    return;
  }

  return (
    <>
      <PageTitle title={ `Withdrawals (L2${ nbsp }${ rightLineArrow }${ nbsp }L1)` } withTextAd/>
      <DataListDisplay
        isError={ isError }
        items={ data?.items }
        emptyText="There are no withdrawals."
        content={ content }
        actionBar={ actionBar }
      />
    </>
  );
};

export default PlatonAppchainWithdrawals;
