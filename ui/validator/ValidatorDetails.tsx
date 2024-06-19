import { Grid, Skeleton } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { ValidatorResponse } from 'types/api/validators';

import type { ResourceError } from 'lib/api/resources';
import DetailsInfoItem from 'ui/shared/DetailsInfoItem';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import { formatNumberValue, percentageFormatter } from 'ui/shared/validator/utils';

type Props = {
  query: UseQueryResult<ValidatorResponse, ResourceError>;
  hash: string;
}
const ValidatorDetails = ({ query }: Props) => {
  const { data, isPlaceholderData } = query;

  return (
    <Grid
      columnGap={ 8 }
      rowGap={{ base: 1, lg: 3 }}
      templateColumns={{ base: 'minmax(0, 1fr)', lg: 'auto minmax(0, 1fr)' }} overflow="hidden"
    >
      <DetailsInfoItem
        title="Owner Address"
        hint="Validator staking management account address"
        isLoading={ isPlaceholderData }
      >
        <AddressEntity isLoading={ isPlaceholderData } address={{ hash: data?.owner_address }}/>
      </DetailsInfoItem>
      <DetailsInfoItem
        title="Commission"
        hint="Commission rate charged by the validator"
        isLoading={ isPlaceholderData }
      >
        <Skeleton isLoaded={ !isPlaceholderData } display="inline-block">
          { formatNumberValue(data?.commission, percentageFormatter) }
        </Skeleton>
      </DetailsInfoItem>
      <DetailsInfoItem
        title="Website"
        hint="Validator official website"
        isLoading={ isPlaceholderData }
      >
        <Skeleton isLoaded={ !isPlaceholderData } display="inline-block">
          { data?.website ?? '-' }
        </Skeleton>
      </DetailsInfoItem>
      <DetailsInfoItem
        title="Details"
        hint="Validator description information"
        isLoading={ isPlaceholderData }
      >
        <Skeleton isLoaded={ !isPlaceholderData } display="inline-block">
          { data?.detail ?? '-' }
        </Skeleton>
      </DetailsInfoItem>

    </Grid>
  );
};

export default ValidatorDetails;
