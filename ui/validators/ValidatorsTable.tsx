import { Table, Tbody, Tr, Th, Link } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { Validator, ValidatorsSorting, ValidatorsSortingField, ValidatorsSortingValue } from 'types/api/validators';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import IconSvg from 'ui/shared/IconSvg';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import getNextSortValue from 'ui/shared/sort/getNextSortValue';
import { default as Thead } from 'ui/shared/TheadSticky';

import { SORT_SEQUENCE } from './utils';
import ValidatorsTableItem from './ValidatorsTableItem';

interface Props {
  data: Array<Validator>;
  sort: ValidatorsSortingValue | undefined;
  setSorting: (val: ValidatorsSortingValue | undefined) => void;
  isLoading?: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
}

const ValidatorsTable = ({ data, sort, setSorting, isLoading, socketInfoAlert, socketInfoNum }: Props) => {
  const sortIconTransform = sort?.includes('asc' as ValidatorsSorting['order']) ? 'rotate(-90deg)' : 'rotate(90deg)';

  const onSortToggle = React.useCallback((field: ValidatorsSortingField) => () => {
    const value = getNextSortValue<ValidatorsSortingField, ValidatorsSortingValue>(SORT_SEQUENCE, field)(sort);
    setSorting(value);
  }, [ sort, setSorting ]);

  return (
    <AddressHighlightProvider>
      <Table variant="simple" minWidth="1040px" size="sm">
        <Thead top={ 76 }>
          <Tr>
            <Th width={ 100 }>Rank</Th>
            <Th width="30%" minWidth={ 240 }>Validators</Th>
            <Th width="15%">Status</Th>
            <Th width="15%">
              <Link
                display="flex"
                alignItems="center"
                onClick={ isLoading ? undefined : onSortToggle('commission') }
                columnGap={ 1 }
              >
                { sort?.includes('commission') && <IconSvg name="arrows/east" boxSize={ 4 } transform={ sortIconTransform }/> }
              Commission
              </Link>
            </Th>
            <Th width="15%">Total Bonded</Th>
            <Th width="15%">Delegations</Th>
            <Th width="150px" >
              <Link
                display="flex"
                alignItems="center"
                onClick={ isLoading ? undefined : onSortToggle('expect_apr') }
                columnGap={ 1 }
              >
                { sort?.includes('expect_apr') && <IconSvg name="arrows/east" boxSize={ 4 } transform={ sortIconTransform }/> }
              Expect APR
              </Link>
            </Th>
            <Th width="20%" isNumeric>
              <Link
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                onClick={ isLoading ? undefined : onSortToggle('block_rate') }
                columnGap={ 1 }
              >
                { sort?.includes('block_rate') && <IconSvg name="arrows/east" boxSize={ 4 } transform={ sortIconTransform }/> }
              Block Rate(24h)
              </Link>
            </Th>
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
              <ValidatorsTableItem
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

export default React.memo(ValidatorsTable);
