import { Grid, HStack, Text } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';

import type { ValidatorResponse } from 'types/api/validator';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import StatsWidget from 'ui/shared/stats/StatsWidget';
import StatsHint from 'ui/shared/validator/StatsHint';
import { currencyAmountFormatter } from 'ui/shared/validator/utils';

type Props = {
  query: UseQueryResult<ValidatorResponse, ResourceError>;
  hash: string;
}
const ValidatorStats = ({ query }: Props) => {
  const { data, isError, isPlaceholderData } = query;

  const selfStackHints = useMemo(() => [
    {
      label: 'Self-Stakes',
      value: currencyAmountFormatter(data?.self_stakes) + ' ' + config.chain.currency.symbol,
    },
    {
      label: 'Unbonding',
      value: currencyAmountFormatter(data?.unbonding) + ' ' + config.chain.currency.symbol,
    },
    {
      label: 'Pending Withdrawal',
      value: currencyAmountFormatter(data?.pending_withdrawal) + ' ' + config.chain.currency.symbol,
    },
  ], [ data ]);

  const rewardsHints = useMemo(() => [
    {
      label: 'Validator Rewards',
      value: currencyAmountFormatter(data?.validator_rewards) + ' ' + config.chain.currency.symbol,
    },
    {
      label: 'Delegator Rewards',
      value: currencyAmountFormatter(data?.delegator_rewards) + ' ' + config.chain.currency.symbol,
    },
  ], [ data ]);

  if (isError) {
    return <DataFetchAlert/>;
  }
  if (!data) {
    return null;
  }

  return (
    <Grid
      gridTemplateColumns={{ lg: `repeat(5, 1fr)`, base: '1fr 1fr' }}
      gridTemplateRows={{ lg: 'none', base: undefined }}
      gridGap={{ base: 1, lg: 3 }}
      marginTop={ 10 }
      mb={ 12 }
    >
      <StatsWidget
        label="Total Bonded"
        value={ currencyAmountFormatter(data.total_bonded) }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Self-Stakes"
        value={ currencyAmountFormatter(data.self_stakes) }
        isLoading={ isPlaceholderData }
        hint={ (
          <StatsHint title="Validator staking info" list={ selfStackHints }/>
        ) }
      />
      <StatsWidget
        label="Delegations"
        value={ (
          <HStack alignItems="center" gap="4px">
            <Text>{ currencyAmountFormatter(data.delegations) }
            </Text>
            <Text color="gray.400">({ Number(new BigNumber(data.delegations).div(data.total_bonded).times(100).toFixed(2)) }%)</Text>
          </HStack>
        ) }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Blocks"
        value={ Number(data.blocks).toLocaleString() }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Block Rate(24h)"
        value={ `${ Number(data.block_rate) / 100 }%` }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Expect APR"
        value={ `${ Number(data.expect_apr) / 100 }%` }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Total Rewards"
        value={ currencyAmountFormatter(data.total_rewards) }
        isLoading={ isPlaceholderData }
        hint={ (
          <StatsHint title="Reward distribution" list={ rewardsHints }/>
        ) }
      />
      <StatsWidget
        label="Validator Claimable Rewards"
        value={ currencyAmountFormatter(data.validator_claimable_rewards) }
        isLoading={ isPlaceholderData }
      />
    </Grid>
  );
};

export default ValidatorStats;
