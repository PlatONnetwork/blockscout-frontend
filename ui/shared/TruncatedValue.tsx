import type { PlacementWithLogical } from '@chakra-ui/react';
import { Skeleton, chakra } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import React from 'react';

import TruncatedTextTooltip from 'ui/shared/TruncatedTextTooltip';

interface Props {
  className?: string;
  isLoading?: boolean;
  value: ReactNode;
  tooltipPlacement?: PlacementWithLogical;
}

const TruncatedValue = ({ className, isLoading, value, tooltipPlacement }: Props) => {
  return (
    <TruncatedTextTooltip label={ value } placement={ tooltipPlacement }>
      <Skeleton
        className={ className }
        isLoaded={ !isLoading }
        display="inline-block"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        height="fit-content"
      >
        { value }
      </Skeleton>
    </TruncatedTextTooltip>
  );
};

export default React.memo(chakra(TruncatedValue));
