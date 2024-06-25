import React from 'react';

import Tag from 'ui/shared/chakra/Tag';

interface Props {
  exited?: boolean;
  isLoading?: boolean;
}

const ValidatorHistoryStatus = ({ exited, isLoading }: Props) => {
  if (exited) {
    return <Tag px="10px" color="gray.500" fontWeight="bold" isLoading={ isLoading } colorScheme="gray">Exited</Tag>;
  } else {
    return <Tag px="10px" color="red.500" fontWeight="bold" isLoading={ isLoading } colorScheme="red">Exiting...</Tag>;
  }
};

export default React.memo(ValidatorHistoryStatus);
