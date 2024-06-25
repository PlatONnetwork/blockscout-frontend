import { useEffect, useState } from 'react';
import type { Block } from 'viem';
import { useBlock, useBlockNumber } from 'wagmi';

export const useLatestBlock = () => {
  const [ latestBlock, setLatestBlock ] = useState<Block|undefined>();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: block } = useBlock(blockNumber ? { blockNumber } : undefined);

  useEffect(() => {
    if (block) {
      setLatestBlock(block);
    }
  }, [ block ]);

  return latestBlock;
};
