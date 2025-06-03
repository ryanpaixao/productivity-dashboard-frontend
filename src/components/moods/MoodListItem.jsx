import { Box, Divider, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import MoodIcons from './MoodIcons'

const MoodListItem = ({ item = {}, onDelete, index }) => {
  const hoverBg = useColorModeValue('gray.50', 'gray.600');
  const mood = MoodIcons.find((obj) => obj.id === item.rating);
  const date = new Date(item.createdAt);
  const humanReadableDate = date.toLocaleString(); // Format as local date and time

  return (
    <>
      <Stack
        align='center'
        p={2}
        _hover={{ bg: hoverBg }}
        direction={'row'}
      >
        <Stack flex='1' direction={'row'} gap={4} align='center'>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            alignContent={'space-between'}
            flexBasis={{ base: '10%', md: 'calc(10% - 16px)' }}
            flexGrow={0}
            flexShrink={0}
          >
            <Box>
              {index}
            </Box>
            <Box alignContent={'center'}>
              {mood.icon}
            </Box>
            <Box>
              {item.rating}
            </Box>
            <Box>
              {mood.label}
            </Box>
          </Stack>
          <Text flex='1'>
            {humanReadableDate}
          </Text>
        </Stack> 
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => onDelete(item._id)}
          aria-label={`Delete mood`}
          colorScheme='red'
          size='sm'
        />
      </Stack>
      <Divider />
    </>
  )
};

export default MoodListItem;
