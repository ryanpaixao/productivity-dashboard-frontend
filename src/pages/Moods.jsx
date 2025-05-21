import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API calls
import { getMoods, createMood } from "../api/moodsAPI";

// Components
import MoodButtons from "../components/moods/moodButtons";

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
      entryDate: new Date().toISOString
    })
  };

  return <MoodButtons onMoodSelection={onMoodSelection} />
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
    </Flex>
  );
}

export default Moods;
