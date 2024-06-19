import React from 'react';

import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import ValidatorActionTable from './ValidatorActionTable';

type Props = {
  query: QueryWithPagesResult<'validator_action'>;
}

const ValidatorAction = ({ query }: Props) => {
  const { data, isPlaceholderData, isError } = query;

  const content = data ? (
    <ValidatorActionTable
      data={ data.items }
      isLoading={ isPlaceholderData }
    />
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      items={ data?.items }
      emptyText="There are no validator actions."
      content={ content }/>
  );
};

export default ValidatorAction;
