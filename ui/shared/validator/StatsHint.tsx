import { Box, Grid, Text, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import React from 'react';
type Props = {
  title?: ReactNode;
  list?: Array<{
    label: ReactNode;
    value: ReactNode;
  }> | null;
}

const StatsHint = ({ list, title }: Props) => {
  const labelColor = useColorModeValue('blue.200', 'blue.500');
  const textColor = useColorModeValue('#fff', 'gray.700');
  const titleColor = useColorModeValue('gray.400', 'gray.500');
  return (
    <Box padding="14px" fontSize="13px">
      { title ? <Text color={ titleColor } mb="15px">{ title }</Text> : null }
      <Grid
        gridTemplateColumns="repeat(2, minmax(50px, auto))"
        gridGap="10px 30px"
      >
        {
          list?.map(({ label, value }, index) => (
            <React.Fragment key={ index }>
              <Text color={ labelColor }>{ label }</Text>
              <Text color={ textColor }>{ value }</Text>
            </React.Fragment>
          ))
        }
      </Grid>
    </Box>
  );
};

export default StatsHint;
