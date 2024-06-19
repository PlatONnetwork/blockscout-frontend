import React from 'react';

import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import ValidatorDelegatorTable from './ValidatorDelegatorTable';

type Props = {
  query: QueryWithPagesResult<'validator_delegator'>;
}

const ValidatorDelegator = ({ query }: Props) => {
  const { data, isPlaceholderData, isError } = query;

  const content = data ? (
    <ValidatorDelegatorTable
      data={ data.items }
      isLoading={ isPlaceholderData }
    />
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      items={ data?.items }
      emptyText="There are no validator delegations."
      content={ content }/>
  );
};

export default ValidatorDelegator;
