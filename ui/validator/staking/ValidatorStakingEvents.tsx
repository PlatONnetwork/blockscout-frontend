import React from 'react';

import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import ValidatorStakingTable from './ValidatorStakingTable';

type Props = {
  query: QueryWithPagesResult<'validator_staking'>;
}

const ValidatorStakingEvents = ({ query }: Props) => {
  const { data, isPlaceholderData, isError } = query;

  const content = data ? (
    <ValidatorStakingTable
      data={ data.items }
      isLoading={ isPlaceholderData }
    />
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      items={ data?.items }
      emptyText="There are no staking events."
      content={ content }/>
  );
};

export default ValidatorStakingEvents;
