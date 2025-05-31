import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API calls
import { getMoods, createMood, deleteMood } from "../api/moodsAPI";

// Components
import MoodButtons from "../components/moods/MoodButtons";
import MoodList from '../components/moods/MoodList';

// Constants
import ITEM_TYPES from '../constants/ITEM_TYPES';
const MOOD_QUERY_KEY = 'moods';

const MoodButtonContainer = ({ userId }) => {
  const queryClient = useQueryClient();

  // Add new Mood
  const mutation = useMutation({
    mutationFn: createMood,
    onSuccess: (_, params, context) => {
      // Invalidate cache and refetch moods after success
      queryClient.invalidateQueries({ queryKey: [MOOD_QUERY_KEY] });
    },
  });
  const onMoodSelection = (rating) => {
    mutation.mutate({
      userId,
      rating,
      createdAt: new Date().toISOString()
    })
  };

  return <MoodButtons onMoodSelection={onMoodSelection} />
};

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
  const {
    data: moods,
    isLoading,
    error
  } = useQuery({
    queryKey:[MOOD_QUERY_KEY],
    queryFn: getMoods,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const userId = '6820e188c8970fadd5b3d4ce'; // TODO: update userId fetch. rm default Id

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
