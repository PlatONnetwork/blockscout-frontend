import type { ValidatorsSortingValue, ValidatorsSortingField, Validator } from 'types/api/validators';

import compareBns from 'lib/bigint/compareBns';

export const SORT_SEQUENCE: Record<ValidatorsSortingField, Array<ValidatorsSortingValue | undefined>> = {
  commission: [ 'commission-desc', 'commission-asc', undefined ],
  expect_apr: [ 'expect_apr-desc', 'expect_apr-asc', undefined ],
  block_rate: [ 'block_rate-desc', 'block_rate-asc', undefined ],
};

export default function sortValidators(sorting: ValidatorsSortingValue | undefined) {
  return function sortingFn(item1: Validator, item2: Validator) {
    switch (sorting) {
      case 'commission-desc':
        return compareBns(item2.commission || 0, item1.commission || 0);
      case 'commission-asc':
        return compareBns(item1.commission || 0, item2.commission || 0);
      case 'expect_apr-desc':
        return compareBns(item2.expect_apr || 0, item1.expect_apr || 0);
      case 'expect_apr-asc':
        return compareBns(item1.expect_apr || 0, item2.expect_apr || 0);
      case 'block_rate-desc':
        return compareBns(item2.block_rate || 0, item1.block_rate || 0);
      case 'block_rate-asc':
        return compareBns(item1.block_rate || 0, item2.block_rate || 0);
      default:
        return 0;
    }
  };
}
