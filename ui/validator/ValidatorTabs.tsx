import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import getQueryParamString from 'lib/router/getQueryParamString';
import { generateListStub } from 'stubs/utils';
import { VALIDATOR_ACTION, VALIDATOR_BLOCK, VALIDATOR_DELEGATOR, VALIDATOR_STAKING } from 'stubs/validator';
import Pagination from 'ui/shared/pagination/Pagination';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';
import ValidatorAction from 'ui/validator/action/ValidatorAction';
import ValidatorBlocksProduced from 'ui/validator/block/ValidatorBlocksProduced';
import ValidatorDelegator from 'ui/validator/delegator/ValidatorDelegator';
import ValidatorStakingEvents from 'ui/validator/staking/ValidatorStakingEvents';

type Props = {
  isLoading: boolean;
  hash: string;
}

const TAB_LIST_PROPS = {
  marginBottom: 0,
  pt: 6,
  pb: 3,
  marginTop: -5,
};

const ValidatorTabs = ({ isLoading, hash }: Props) => {
  const router = useRouter();
  const tab = getQueryParamString(router.query.tab) || 'staking-events';

  const stakingQuery = useQueryWithPages({
    resourceName: 'validator_staking',
    filters: {
      validator_hash: hash,
    },
    options: {
      enabled: tab === 'staking',
      placeholderData: generateListStub<'validator_staking'>(
        VALIDATOR_STAKING,
        50,
        { next_page_params: null },
      ),
    },
  });

  const blockQuery = useQueryWithPages({
    resourceName: 'validator_blocks',
    filters: {
      validator_hash: hash,
    },
    options: {
      enabled: tab === 'block',
      placeholderData: generateListStub<'validator_blocks'>(
        VALIDATOR_BLOCK,
        50,
        { next_page_params: null },
      ),
    },
  });

  const actionQuery = useQueryWithPages({
    resourceName: 'validator_action',
    filters: {
      validator_hash: hash,
    },
    options: {
      enabled: tab === 'action',
      placeholderData: generateListStub<'validator_action'>(
        VALIDATOR_ACTION,
        50,
        { next_page_params: null },
      ),
    },
  });

  const delegatorQuery = useQueryWithPages({
    resourceName: 'validator_delegator',
    filters: {
      validator_hash: hash,
    },
    options: {
      enabled: tab === 'delegator',
      placeholderData: generateListStub<'validator_delegator'>(
        VALIDATOR_DELEGATOR,
        50,
        { next_page_params: null },
      ),
    },
  });

  const tabs = useMemo(() => ([
    {
      id: 'staking',
      title: 'Staking Events',
      component: <ValidatorStakingEvents/>,
    },
    {
      id: 'block',
      title: 'Blocks Produced',
      component: <ValidatorBlocksProduced query={ blockQuery }/>,
    },
    {
      id: 'action',
      title: 'Validator Action',
      component: <ValidatorAction/>,
    },
    {
      id: 'delegator',
      title: 'Validator Delegator',
      component: <ValidatorDelegator/>,
    },
  ]), [ blockQuery ]);

  const pagination = (() => {
    switch (tab) {
      case 'staking': return stakingQuery.pagination;
      case 'block': return blockQuery.pagination;
      case 'action': return actionQuery.pagination;
      case 'delegator': return delegatorQuery.pagination;
      default: return stakingQuery.pagination;
    }
  })();

  return (
    <RoutedTabs
      tabs={ tabs }
      rightSlot={ pagination.isVisible ? <Pagination my={ 1 } { ...pagination }/> : null }
      isLoading={ isLoading }
      tabListProps={ TAB_LIST_PROPS }
      stickyEnabled
    />
  );
};

export default ValidatorTabs;
