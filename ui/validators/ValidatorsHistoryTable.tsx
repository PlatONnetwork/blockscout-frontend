import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { HistoricalValidator } from 'types/api/validators';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import { default as Thead } from 'ui/shared/TheadSticky';

import ValidatorsHistoryTableItem from './ValidatorsHistoryTableItem';

interface Props {
  data: Array<HistoricalValidator>;
  isLoading?: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
}

const ValidatorsHistoryTable = ({ data, isLoading, socketInfoAlert, socketInfoNum }: Props) => {

  return (
    <AddressHighlightProvider>
      <Table variant="simple" minWidth="830px" size="sm">
        <Thead>
          <Tr>
            <Th width={ 100 }>No.</Th>
            <Th width="30%">Validators</Th>
            <Th width="20%">Status</Th>
            <Th width="30%">Exit Block</Th>
            <Th width="20%">Event</Th>
          </Tr>
        </Thead>
        <Tbody>

          <SocketNewItemsNotice.Desktop
            url={ window.location.href }
            alert={ socketInfoAlert }
            num={ socketInfoNum }
            isLoading={ isLoading }
            type="validator"
          />

          <AnimatePresence initial={ false }>
            { data.map((item, index) => (
              <ValidatorsHistoryTableItem
                key={ String(item.validators) + (isLoading ? index : '') }
                data={ item }
                isLoading={ isLoading }/>
            )) }
          </AnimatePresence>
        </Tbody>
      </Table>
    </AddressHighlightProvider>
  );
};

export default React.memo(ValidatorsHistoryTable);
