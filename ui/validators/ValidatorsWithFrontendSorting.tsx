import { Hide, Show } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import React, { useMemo } from 'react';

import type { ValidatorsCountersResponse, ValidatorsSortingValue } from 'types/api/validators';

import type { ResourceError } from 'lib/api/resources';
import * as cookies from 'lib/cookies';
import useNewValidatorsSocket from 'lib/hooks/useNewValidatorsSocket';
import { apos } from 'lib/html-entities';
import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';
import ValidatorsList from 'ui/validators/ValidatorsList';
import ValidatorsTable from 'ui/validators/ValidatorsTable';

import sortValidators from './utils';

type Props = {
  query: QueryWithPagesResult<'validators'>;
  counterQuery: UseQueryResult<ValidatorsCountersResponse, ResourceError>;
  searchTerm: string | undefined;
}
type SortingValue = ValidatorsSortingValue | undefined;

const ValidatorsWithFrontendSorting = ({ query, counterQuery, searchTerm }: Props) => {
  const [ sort, setSort ] =
    React.useState<SortingValue>(cookies.get(cookies.NAMES.VALIDATORS_SORT) as SortingValue);

  const { isError, isPlaceholderData, data } = query;

  const setSortByValue = React.useCallback((value: SortingValue) => {
    setSort((prevVal: SortingValue) => {
      let newVal: SortingValue = undefined;
      if (value !== prevVal) {
        newVal = value as SortingValue;
      }
      cookies.set(cookies.NAMES.VALIDATORS_SORT, newVal ? newVal : '');
      return newVal;
    });
  }, []);

  const { num, socketAlert } = useNewValidatorsSocket();

  const sortedList = useMemo(() => data?.items.slice().sort(sortValidators(sort)), [ data, sort ]);
  const content = sortedList && counterQuery.data ? (
    <>
      <Show below="lg" ssr={ false }>
        <ValidatorsList data={ sortedList } isLoading={ isPlaceholderData }/>
      </Show>
      <Hide below="lg" ssr={ false }>
        <ValidatorsTable
          socketInfoNum={ num }
          socketInfoAlert={ socketAlert }
          data={ sortedList }
          sort={ sort }
          setSorting={ setSortByValue }
          isLoading={ isPlaceholderData || counterQuery.isPlaceholderData }
          counterData={ counterQuery.data }
        />
      </Hide>
    </>
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      items={ sortedList }
      emptyText="There are no validators."
      filterProps={{
        emptyFilteredText: `Couldn${ apos }t find any validator that matches your query.`,
        hasActiveFilters: Boolean(searchTerm),
      }}
      content={ content }
    />
  );
};

export default ValidatorsWithFrontendSorting;
