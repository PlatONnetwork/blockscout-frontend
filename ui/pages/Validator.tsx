import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import { useAppContext } from 'lib/contexts/app';
import throwOnAbsentParamError from 'lib/errors/throwOnAbsentParamError';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import getQueryParamString from 'lib/router/getQueryParamString';
import shortenString from 'lib/shortenString';
import { VALIDATOR_DETAIL } from 'stubs/validators';
import AddressQrCode from 'ui/address/details/AddressQrCode';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import PageTitle from 'ui/shared/Page/PageTitle';
import ValidatorStatus from 'ui/shared/statusTag/ValidatorStatus';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';
import TabsSkeleton from 'ui/shared/Tabs/TabsSkeleton';
import ValidatorAction from 'ui/validator/ValidatorAction';
import ValidatorBlocksProduced from 'ui/validator/ValidatorBlocksProduced';
import ValidatorDelegator from 'ui/validator/ValidatorDelegator';
import ValidatorDetails from 'ui/validator/ValidatorDetails';
import ValidatorStakingEvents from 'ui/validator/ValidatorStakingEvents';
import ValidatorStats from 'ui/validator/ValidatorStats';

const Validator = () => {
  const router = useRouter();
  const hash = getQueryParamString(router.query.hash);
  const appProps = useAppContext();

  const validatorQuery = useApiQuery<'validator'>('validator', {
    pathParams: { hash },
    queryOptions: {
      refetchOnMount: 'always',
      enabled: Boolean(hash),
      placeholderData: VALIDATOR_DETAIL,
    },
  });

  const tabs = useMemo(() => ([
    {
      id: 'staking_events',
      title: 'Staking Events',
      component: <ValidatorStakingEvents/>,
    },
    {
      id: 'blocks_produced',
      title: 'Blocks Produced',
      component: <ValidatorBlocksProduced/>,
    },
    {
      id: 'validator_action',
      title: 'Validator Action',
      component: <ValidatorAction/>,
    },
    {
      id: 'validator_delegator',
      title: 'Validator Delegator',
      component: <ValidatorDelegator/>,
    },
  ]), []);

  throwOnAbsentParamError(hash);
  throwOnResourceLoadError(validatorQuery);

  const isLoading = validatorQuery.isPlaceholderData;
  const titleSecondRow = (
    <Flex alignItems="center" w="100%" columnGap={ 2 } rowGap={ 2 } flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
      <AddressEntity
        address={{ hash }}
        isLoading={ isLoading }
        fontFamily="heading"
        fontSize="lg"
        fontWeight={ 500 }
        mr={ 4 }
      />
      <AddressQrCode address={{ hash }} isLoading={ isLoading }/>
    </Flex>
  );

  const backLink = React.useMemo(() => {
    const hasGoBackLink = appProps.referrer && appProps.referrer.includes('/validators');

    if (!hasGoBackLink) {
      return;
    }

    return {
      label: 'Back to validator list',
      url: appProps.referrer,
    };
  }, [ appProps.referrer ]);

  return (
    <>
      <PageTitle
        title={ shortenString(hash, 16) }
        contentAfter={ (
          <ValidatorStatus isLoading={ isLoading } state={ validatorQuery.data?.role }/>
        ) }
        isLoading={ isLoading }
        secondRow={ titleSecondRow }
        backLink={ backLink }
      />
      <ValidatorDetails hash={ hash } query={ validatorQuery }/>
      <ValidatorStats hash={ hash } query={ validatorQuery }/>
      {
        isLoading ? <TabsSkeleton tabs={ tabs }/> : <RoutedTabs tabs={ tabs }/>
      }
    </>
  );
};

export default Validator;
