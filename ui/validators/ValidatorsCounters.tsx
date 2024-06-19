import { Box } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { VALIDATORS_COUNTERS } from 'stubs/validators';
import StatsWidget from 'ui/shared/stats/StatsWidget';
import StatsHint from 'ui/shared/validator/StatsHint';

const ValidatorsCounters = () => {
  const countersQuery = useApiQuery('validators_counters', {
    queryOptions: {
      placeholderData: VALIDATORS_COUNTERS,
    },
  });

  const hints = useMemo(() => countersQuery.data ? [ {
    label: 'BlockReward',
    value: countersQuery.data.block_reward + ' ' + config.chain.currency.symbol,
  }, {
    label: 'EpochStakingReward',
    value: countersQuery.data.epoch_staking_reward + ' ' + config.chain.currency.symbol,
  } ] :
    null, [ countersQuery ]);

  if (!countersQuery.data) {
    return null;
  }

  return (
    <Box columnGap={ 3 } rowGap={ 3 } mb={ 6 } display="grid" gridTemplateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}>
      <StatsWidget
        label="validators"
        value={ Number(countersQuery.data.validators).toLocaleString() }
        diff={ countersQuery.data.validators_24_hours }
        diffPeriod="24h"
        isLoading={ countersQuery.isPlaceholderData }
      />
      <StatsWidget
        label={ `Total Bonded(${ config.chain.currency.symbol })` }
        value={ Number(countersQuery.data.total_bonded).toLocaleString() }
        diff={ countersQuery.data.total_bonded_24_hours }
        diffPeriod="24h"
        isLoading={ countersQuery.isPlaceholderData }
      />
      <StatsWidget
        label={ `Reward Pool(${ config.chain.currency.symbol })` }
        value={ countersQuery.data.reward_pool }
        isLoading={ countersQuery.isPlaceholderData }
        hint={ (
          <StatsHint list={ hints }/>
        ) }
      />
    </Box>
  );
};

export default React.memo(ValidatorsCounters);
