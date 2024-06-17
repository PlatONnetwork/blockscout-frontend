import React from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import useNewValidatorsSocket from 'lib/hooks/useNewValidatorsSocket';
import { generateListStub } from 'stubs/utils';
import { VALIDATOR_HISTORY } from 'stubs/validators';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import ValidatorsHistoryTable from 'ui/validators/ValidatorsHistoryTable';

const HistoricalValidator = () => {
  const { data, isPlaceholderData, isError } = useApiQuery('validators_history', {
    queryOptions: {
      placeholderData: generateListStub<'validators_history'>(
        VALIDATOR_HISTORY,
        5,
        { next_page_params: null },
      ),
    },
  });
  const { num, socketAlert } = useNewValidatorsSocket();
  const content = data ? (
    <ValidatorsHistoryTable
      data={ data.items }
      isLoading={ isPlaceholderData }
      socketInfoNum={ num }
      socketInfoAlert={ socketAlert }/>
  ) : null;

  return (
    <>
      <PageTitle
        title="Historical validators"
        backLink={{ url: '/validators', label: 'Back to validator list' }}
      />
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
