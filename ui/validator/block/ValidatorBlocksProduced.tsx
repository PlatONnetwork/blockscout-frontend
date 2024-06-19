import React from 'react';

import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import ValidatorBlocksTable from './ValidatorBlocksTable';

type Props = {
  query: QueryWithPagesResult<'validator_blocks'>;
}

const ValidatorBlocksProduced = ({ query }: Props) => {
  const { data, isPlaceholderData, isError } = query;

  const content = data ? (
    <ValidatorBlocksTable
      data={ data.items }
      isLoading={ isPlaceholderData }
    />
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      items={ data?.items }
      emptyText="There are no block produced."
      content={ content }/>
  );
};

export default ValidatorBlocksProduced;
