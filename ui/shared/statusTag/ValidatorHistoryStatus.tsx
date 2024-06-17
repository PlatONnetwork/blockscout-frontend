import React from 'react';

import Tag from 'ui/shared/chakra/Tag';

interface Props {
  status: number;
  isLoading?: boolean;
}

const ValidatorHistoryStatus = ({ status, isLoading }: Props) => {
  if (status >= 8) {
    return <Tag isLoading={ isLoading } colorScheme="gray">Exited</Tag>;
  } else {
    return <Tag isLoading={ isLoading } colorScheme="red">Exiting...</Tag>;
  }
};

export default React.memo(ValidatorHistoryStatus);
