import { useRouter } from 'next/router';
import React from 'react';

import useGradualIncrement from 'lib/hooks/useGradualIncrement';
import useSocketChannel from 'lib/socket/useSocketChannel';
import useSocketMessage from 'lib/socket/useSocketMessage';

type Event = 'all_validator' | 'active_validator' | 'candidate_validator'

export default function useNewValidatorsSocket() {
  const router = useRouter();
  const [ num, setNum ] = useGradualIncrement(0);
  const [ socketAlert, setSocketAlert ] = React.useState('');
  const { tab = 'all' } = router.query ;
  const topic = `platon_appchain_l2_validator:${ tab }_validator`;
  const event = `${ tab }_validator` as Event;

  const handleNewValidatorMessage = React.useCallback((response: number) => {
    setNum(response);
  }, [ setNum ]);

  const handleSocketClose = React.useCallback(() => {
    setSocketAlert('Connection is lost. Please reload page.');
  }, []);

  const handleSocketError = React.useCallback(() => {
    setSocketAlert('An error has occurred while fetching new validators. Please reload page.');
  }, []);

  const channel = useSocketChannel({
    topic,
    onSocketClose: handleSocketClose,
    onSocketError: handleSocketError,
    isDisabled: !topic,
  });

  useSocketMessage({
    channel,
    event,
    handler: handleNewValidatorMessage,
  });

  if (!topic && !event) {
    return {};
  }

  return { num, socketAlert };
}
