import React from 'react';

import { ValidatorRole, type Validator } from 'types/api/validators';

import Tag from 'ui/shared/chakra/Tag';

interface Props {
  state?: Validator['role'];
  isLoading?: boolean;
}

const ValidatorStatus = ({ state, isLoading }: Props) => {
  switch (state) {
    case ValidatorRole.ACTIVE:
      return <Tag px="10px" color="green.500" fontWeight="bold" isLoading={ isLoading } colorScheme="green">Active</Tag>;
    case ValidatorRole.VERIFYING:
      return <Tag px="10px" color="orange.500" fontWeight="bold" isLoading={ isLoading } colorScheme="orange">Verifying...</Tag>;
    case ValidatorRole.CANDIDATE:
      return <Tag px="10px" color="purple.500" fontWeight="bold" isLoading={ isLoading } colorScheme="purple">Candidate</Tag>;
    default:
      return null;
  }
};

export default React.memo(ValidatorStatus);
