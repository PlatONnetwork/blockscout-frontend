import { Grid, HStack, Text } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import React, { useMemo } from 'react';

import type { ValidatorResponse } from 'types/api/validators';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import StatsWidget from 'ui/shared/stats/StatsWidget';
import StatsHint from 'ui/shared/validator/StatsHint';
import { formatNumberValue, percentageFormatter, toLocaleStringFormatter } from 'ui/shared/validator/utils';

type Props = {
  query: UseQueryResult<ValidatorResponse, ResourceError>;
  hash: string;
}
const ValidatorStats = ({ query }: Props) => {
  const { data, isError, isPlaceholderData } = query;

  const selfStackHints = useMemo(() => data ? [
    {
      label: 'Self-Stakes',
      value: data.self_stakes + ' ' + config.chain.currency.symbol,
    },
    {
      label: 'Unbonding',
      value: data.unbonding + ' ' + config.chain.currency.symbol,
    },
    {
      label: 'Pending Withdrawal',
      value: data.pending_withdrawal + ' ' + config.chain.currency.symbol,
    },
  ] : null, [ data ]);

  const rewardsHints = useMemo(() => data ? [
    {
      label: 'Validator Rewards',
      value: data.validator_rewards + ' ' + config.chain.currency.symbol,
    },
    {
      label: 'Delegator Rewards',
      value: data.delegator_rewards + ' ' + config.chain.currency.symbol,
    },
  ] : null, [ data ]);

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
        value={ formatNumberValue(data.total_bonded, toLocaleStringFormatter) }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Self-Stakes"
        value={ formatNumberValue(data.self_stakes, toLocaleStringFormatter) }
        isLoading={ isPlaceholderData }
        hint={ (
          <StatsHint title="Validator staking info" list={ selfStackHints }/>
        ) }
      />
      <StatsWidget
        label="Delegations"
        value={ (
          <HStack alignItems="center" gap="4px">
            <Text>{ formatNumberValue(data.delegations, toLocaleStringFormatter) }
            </Text>
            <Text color="gray.400">({ formatNumberValue(data.delegations_proportion, percentageFormatter) })</Text>
          </HStack>
        ) }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Blocks"
        value={ formatNumberValue(data.blocks, toLocaleStringFormatter) }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Block Rate(24h)"
        value={ formatNumberValue(data.block_rate, percentageFormatter) }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Expect APR"
        value={ formatNumberValue(data.expect_apr, percentageFormatter) }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Total Rewards"
        value={ formatNumberValue(data.total_rewards, toLocaleStringFormatter) }
        isLoading={ isPlaceholderData }
        hint={ (
          <StatsHint title="Reward distribution" list={ rewardsHints }/>
        ) }
      />
      <StatsWidget
        label="Validator Claimable Rewards"
        value={ formatNumberValue(data.validator_claimable_rewards, toLocaleStringFormatter) }
        isLoading={ isPlaceholderData }
      />
    </Grid>
  );
};

export default ValidatorStats;
