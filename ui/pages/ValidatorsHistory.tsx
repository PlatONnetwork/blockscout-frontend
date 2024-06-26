import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useBlockNumber } from 'wagmi';

import useNewValidatorsSocket from 'lib/hooks/useNewValidatorsSocket';
import { generateListStub } from 'stubs/utils';
import { VALIDATOR_HISTORY } from 'stubs/validators';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import Pagination from 'ui/shared/pagination/Pagination';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import ValidatorsHistoryTable from 'ui/validators/ValidatorsHistoryTable';

const HistoricalValidator = () => {
  const { data, isPlaceholderData, isError, refetch, pagination } = useQueryWithPages({
    resourceName: 'validators_history',
    options: {
      placeholderData: generateListStub<'validators_history'>(
        VALIDATOR_HISTORY,
        5,
        { next_page_params: null },
      ),
    },
  });

  const { socketAlert } = useNewValidatorsSocket(refetch);
  const { data: blockNumber } = useBlockNumber();
  const list = useMemo(() => data?.items.map(item => ({
    ...item,
    exited: Boolean(item.lock_block && blockNumber && blockNumber > item.lock_block),
  })), [ blockNumber, data?.items ]);

  const content = list ? (
    <ValidatorsHistoryTable
      data={ list }
      isLoading={ Boolean(isPlaceholderData) }
      socketInfoNum={ 0 }
      socketInfoAlert={ socketAlert }/>
  ) : null;

  return (
    <>
      <Flex justifyContent="space-between">
        <PageTitle
          title="Historical validators"
          backLink={{ url: '/validators', label: 'Back to validator list' }}
        />
        { pagination.isVisible ? <Pagination my={ 1 } { ...pagination }/> : null }
      </Flex>
      <DataListDisplay
        isError={ isError }
        items={ data?.items }
        emptyText="There are no historical validators."
        content={ content }
      />
    </>

  );
};

export default HistoricalValidator;