import { Box } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';

import type { ValidatorsCountersResponse } from 'types/api/validators';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import StatsWidget from 'ui/shared/stats/StatsWidget';
import StatsHint from 'ui/shared/validator/StatsHint';
import { currencyAmountFormatter, divDecimals } from 'ui/shared/validator/utils';

type Props = {
  query: UseQueryResult<ValidatorsCountersResponse, ResourceError>;
}

const ValidatorsCounters = ({ query }: Props) => {
  const { isPlaceholderData, data } = query;

  const hints = useMemo(() => data ? [ {
    label: 'BlockReward',
    value: currencyAmountFormatter(data.block_reward) + ' ' + config.chain.currency.symbol,
  }, {
    label: 'EpochStakingReward',
    value: currencyAmountFormatter(data.epoch_staking_reward) + ' ' + config.chain.currency.symbol,
  } ] :
    null, [ data ]);

  if (!data) {
    return null;
  }

  return (
    <Box columnGap={ 3 } rowGap={ 3 } mb={ 6 } display="grid" gridTemplateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}>
      <StatsWidget
        label="validators"
        value={ Number(data.validators).toLocaleString() }
        diff={ data.validators_24_hours }
        diffPeriod="24h"
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label={ `Total Bonded(${ config.chain.currency.symbol })` }
        value={ currencyAmountFormatter(data.total_bonded) }
        diff={ divDecimals(data.total_bonded_24_hours) }
        diffFormatted={ currencyAmountFormatter(new BigNumber(data.total_bonded_24_hours).abs().toString()) }
        diffPeriod="24h"
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label={ `Reward Pool(${ config.chain.currency.symbol })` }
        value={ currencyAmountFormatter(data.reward_pool) }
        isLoading={ isPlaceholderData }
        hint={ (
          <StatsHint list={ hints }/>
        ) }
      />
    </Box>
  );
};

export default React.memo(ValidatorsCounters);
