import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import type { ValidatorResponse } from 'types/api/validator';

import { getResourceKey } from 'lib/api/useApiQuery';
import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

import ValidatorDelegatorTable from './ValidatorDelegatorTable';

type Props = {
  query: QueryWithPagesResult<'validator_delegator'>;
}

const ValidatorDelegator = ({ query }: Props) => {
  const { data, isPlaceholderData, isError } = query;

  const router = useRouter();
  const { hash } = router.query;
  const queryClient = useQueryClient();
  const validatorDetail = queryClient.getQueryData<ValidatorResponse>(
    getResourceKey('validator', { pathParams: { hash: hash as string } }),
  );

  const content = data && validatorDetail ? (
    <ValidatorDelegatorTable
      data={ data.items }
      validatorDetail={ validatorDetail }
      isLoading={ isPlaceholderData || !validatorDetail }
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
