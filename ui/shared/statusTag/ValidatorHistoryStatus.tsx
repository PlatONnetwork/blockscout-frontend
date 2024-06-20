import React from 'react';

import Tag from 'ui/shared/chakra/Tag';

interface Props {
  status: number;
  isLoading?: boolean;
}

const ValidatorHistoryStatus = ({ status, isLoading }: Props) => {
  if (status >= 8) {
    return <Tag px="10px" color="gray.500" fontWeight="bold" isLoading={ isLoading } colorScheme="gray">Exited</Tag>;
  } else {
    return <Tag px="10px" color="red.500" fontWeight="bold" isLoading={ isLoading } colorScheme="red">Exiting...</Tag>;
  }
};

export default React.memo(ValidatorHistoryStatus);
