import { Hide, Show, Skeleton } from '@chakra-ui/react';
import React from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import { rightLineArrow, nbsp } from 'lib/html-entities';
import PlatonAppchainDepositsListItem from 'ui/deposits/platonAppchain/PlatonAppchainDepositsListItem';
import PlatonAppchainDepositsTable from 'ui/deposits/platonAppchain/PlatonAppchainDepositsTable';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import StickyPaginationWithText from 'ui/shared/StickyPaginationWithText';

const PlatonAppchainDeposits = () => {
  const { data, isError, isPlaceholderData, pagination } = useQueryWithPages({
    resourceName: 'platonappchain_deposits',
    // options: {
    //     placeholderData: generateListStub<'optimistic_l2_deposits'>(
    //         L2_DEPOSIT_ITEM,
    //         50,
    //         {
    //             next_page_params: {
    //                 items_count: 50,
    //                 l1_block_number: 9045200,
    //                 tx_hash: '',
    //             },
    //         },
    //     ),
    // },
  });

  const countersQuery = useApiQuery('platonappchain_deposits_count', {
    queryOptions: {
      placeholderData: 10,
    },
  });

  const content = data?.items ? (
    <>
      <Show below="lg" ssr={ false }>
        { data.items.map(((item, index) => (
          <PlatonAppchainDepositsListItem
            key={ String(item.no) + item.state_batches_index + (isPlaceholderData ? index : '') }
            isLoading={ isPlaceholderData }
            item={ item }
          />
        ))) }
      </Show>
      <Hide below="lg" ssr={ false }>
        <PlatonAppchainDepositsTable items={ data.items } top={ pagination.isVisible ? ACTION_BAR_HEIGHT_DESKTOP : 0 } isLoading={ isPlaceholderData }/>
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
                A total of { countersQuery.data?.toLocaleString() } deposits found
      </Skeleton>
    );
  })();

  const actionBar = <StickyPaginationWithText text={ text } pagination={ pagination }/>;

  return (
    <>
      <PageTitle title={ `Deposits (L1${ nbsp }${ rightLineArrow }${ nbsp }L2)` } withTextAd/>
      <DataListDisplay
        isError={ isError }
        items={ data?.items }
        emptyText="There are no deposits."
        content={ content }
        actionBar={ actionBar }
      />
    </>
  );
};

export default PlatonAppchainDeposits;
