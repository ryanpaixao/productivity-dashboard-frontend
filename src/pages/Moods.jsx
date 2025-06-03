import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API calls
import { getMoodsDateRange, deleteMood } from "../api/moodsAPI";

// Components
import MoodButtonContainer from '../components/moods/containers/MoodButtonContainer';
import MoodList from '../components/moods/MoodList';

// Constants
import ITEM_TYPES from '../constants/ITEM_TYPES';
import { MOOD_QUERY_KEY } from '../api/constants/moodQueryKey';

const MoodListContainer = ({ moods }) => {
  const queryClient = useQueryClient();
  
  // Delete Mood mutation
  const deleteMutation = useMutation({
    mutationFn: deleteMood,
    onSuccess: () => {
      // Invalidate cache and refetch mood after success
      queryClient.invalidateQueries({ queryKey: [MOOD_QUERY_KEY] });
    },
    // TODO: Add error handling. toast popup
  });

  return (
    <MoodList
      itemType={ITEM_TYPES.MOOD}
      items={moods}
      onDelete={deleteMutation.mutate}
      // onToggle={toggleMutation.mutate}
    />
  );
};

const Moods = () => {
  const userId = '6820e188c8970fadd5b3d4ce'; // TODO: update userId fetch. rm default Id
  const dateRange = 60; // Number of days for date range
  const endDate = new Date(); // Set to current date/time
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - dateRange); // Set startDate to dateRange days before the current time

  const {
    data: moods,
    isLoading,
    error
  } = useQuery({
    queryKey:[MOOD_QUERY_KEY],
    queryFn: () => getMoodsDateRange(userId, startDate, endDate),
  });

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
      <MoodListContainer moods={moods.data} />
    </Flex>
  );
}

export default Moods;
