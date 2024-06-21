import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';

import type { RoutedTab } from 'ui/shared/Tabs/types';

import useApiQuery from 'lib/api/useApiQuery';
import useDebounce from 'lib/hooks/useDebounce';
import useIsMobile from 'lib/hooks/useIsMobile';
import getQueryParamString from 'lib/router/getQueryParamString';
import { generateListStub } from 'stubs/utils';
import { VALIDATOR, VALIDATORS_COUNTERS } from 'stubs/validators';
import FilterInput from 'ui/shared/filters/FilterInput';
import LinkInternal from 'ui/shared/LinkInternal';
import PageTitle from 'ui/shared/Page/PageTitle';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';
import ValidatorsCounters from 'ui/validators/ValidatorsCounters';
import ValidatorsWithFrontendSorting from 'ui/validators/ValidatorsWithFrontendSorting';
const TAB_LIST_PROPS = {
  marginBottom: 0,
  pt: 6,
  pb: 3,
  marginTop: -5,
};
const Validators = () => {
  const router = useRouter();
  const [ searchTerm, setSearchTerm ] = React.useState(getQueryParamString(router.query.q) || undefined);

  const debouncedSearchTerm = useDebounce(searchTerm || '', 300);

  const tab = getQueryParamString(router.query.tab) || 'all';
  const isMobile = useIsMobile();

  const allQuery = useQueryWithPages({
    resourceName: 'validators',
    pathParams: { status: 'all' },
    filters: {
      q: debouncedSearchTerm,
    },
    options: {
      enabled: tab === 'all',
      placeholderData: generateListStub<'validators'>(
        VALIDATOR,
        5,
        { next_page_params: null },
      ),
    },
  });
  const activeQuery = useQueryWithPages({
    resourceName: 'validators',
    pathParams: { status: 'active' },
    filters: {
      q: debouncedSearchTerm,
    },
    options: {
      enabled: tab === 'active',
      placeholderData: generateListStub<'validators'>(
        VALIDATOR,
        5,
        { next_page_params: null },
      ),
    },
  });
  const candidateQuery = useQueryWithPages({
    resourceName: 'validators',
    pathParams: { status: 'candidate' },
    filters: {
      q: debouncedSearchTerm,
    },
    options: {
      enabled: tab === 'candidate',
      placeholderData: generateListStub<'validators'>(
        VALIDATOR,
        5,
        { next_page_params: null },
      ),
    },
  });

  const countersQuery = useApiQuery('validators_counters', {
    queryOptions: {
      placeholderData: VALIDATORS_COUNTERS,
    },
  });

  const tabs: Array<RoutedTab> = useMemo(() => ([
    {
      id: 'all',
      title: 'All',
      component: <ValidatorsWithFrontendSorting query={ allQuery } counterQuery={ countersQuery } searchTerm={ searchTerm }/>,
    },
    {
      id: 'active',
      title: 'Active',
      component: <ValidatorsWithFrontendSorting query={ activeQuery } counterQuery={ countersQuery } searchTerm={ searchTerm }/>,
    },
    {
      id: 'candidate',
      title: 'Candidate',
      component: <ValidatorsWithFrontendSorting query={ candidateQuery } counterQuery={ countersQuery } searchTerm={ searchTerm }/>,
    },
  ]), [ activeQuery, allQuery, candidateQuery, countersQuery, searchTerm ]);

  const onTabChange = useCallback(() => {
    setSearchTerm('');
  }, []);

  return (
    <Box>
      <PageTitle title="Validators" withTextAd/>
      <ValidatorsCounters query={ countersQuery }/>
      <RoutedTabs
        tabs={ tabs }
        tabListProps={ TAB_LIST_PROPS }
        rightSlotProps={ isMobile ? null : { ml: '10px', flex: 1 } }
        rightSlot={ isMobile ? null : (
          <Flex width="100%" justifyContent="space-between">
            <FilterInput
              w={{ base: '100%', lg: '450px' }}
              size="xs"
              onChange={ setSearchTerm }
              placeholder="Search by validator name or address"
              initialValue={ searchTerm }
            />
            <LinkInternal href="/validators/history" fontWeight={ 600 }>Historical Validators</LinkInternal>
          </Flex>
        ) }
        onTabChange={ onTabChange }
        stickyEnabled={ !isMobile }/>

    </Box>
  );
};

export default Validators;
