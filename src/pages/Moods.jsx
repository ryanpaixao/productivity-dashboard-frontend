import { useState } from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

// Components
import MoodButtonContainer from '../components/moods/containers/MoodButtonContainer';
import MoodListContainer from '../components/moods/containers/MoodListContainer';

// hooks
import { usePaginatedMoods } from '../hooks/usePaginatedMoods';
import MoodPaginationButtons from '../components/moods/MoodPaginationButtons';

const Moods = () => {
  const [page, setPage] = useState(1);

  const userId = '6820e188c8970fadd5b3d4ce'; // TODO: update userId fetch. rm default Id
  const limit = 15; // Set page limit to 15 items
  const indexOffset = limit * (page - 1) + 1; // indexOffset used to sum with list item index
  const {
    data: moods,
    isLoading,
    error
  } = usePaginatedMoods(userId, page, limit);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Flex
      flexDirection={'column'}
      p={4}
      borderRadius={'md'}
      bg='gray.100' // light mode color
      _dark={{ bg: 'gray.700'}} // dark mode override
    >
      <Box>
        <Text fontSize={'xl'} mb={4}>How are you feeling today?</Text>
      </Box>
      <Divider mb={4} />
      <MoodButtonContainer userId={userId} />
      <MoodPaginationButtons moods={moods.data} page={page} setPage={setPage} />
      <MoodListContainer moods={moods.data} indexOffset={indexOffset} />
    </Flex>
  );
}

export default Moods;
