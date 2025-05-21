import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Flex, Text } from '@chakra-ui/react';

// API calls
import { getHabits, createHabit, deleteHabit, toggleHabit } from '../api/habitsAPI';

// Common Components
import CommonList from '../components/common/CommonList';
import CommonInput from '../components/common/CommonInput';

// Constants
import ITEM_TYPES from '../constants/ITEM_TYPES';
const HABIT_QUERY_KEY = 'habits';

const HabitInputContainer = ({ userId }) => {
  const queryClient = useQueryClient();

  // Add habit mutation
  const mutation = useMutation({
    mutationFn: ({ habitPayload }) => createHabit(habitPayload),
    onSuccess: (_, params, context) => {
      // Invalidate cache and refetch habits after success
      queryClient.invalidateQueries({ queryKey: [HABIT_QUERY_KEY] });
      // Clear text Field
      params.resetTitle();
    },
  });

  const setNewHabit = ({ title, resetTitle }) => {
    mutation.mutate({
      habitPayload: {
        userId, // TODO: auto inject userId
        title,
        completed: false,
      },
      resetTitle,
    })
  };

  return <CommonInput itemType={ITEM_TYPES.HABIT} setNewItem={setNewHabit} isSubmitting={mutation.isPending} />
};

const HabitsListContainer = ({ habits }) => {
  const queryClient = useQueryClient();

  // Delete Habit mutation
  const deleteMutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      // Invalidate cache and refetch habits after success
      queryClient.invalidateQueries({ queryKey: [HABIT_QUERY_KEY] });
    },
    // TODO: Add error handling. toast popup
  });

  // Toggle Habit mutation
  const toggleMutation = useMutation({
    mutationFn: ({ itemId, completed }) => toggleHabit(itemId, completed),
    onMutate: async ({ itemId, completed }) => {
      // Cancel ongoing queries
      await queryClient.cancelQueries([HABIT_QUERY_KEY]);
      // Snapshot previous state
      const prevHabits = queryClient.getQueryData([HABIT_QUERY_KEY]);

      // Optimistically update UI
      queryClient.setQueryData([HABIT_QUERY_KEY], (oldData) => {
        const updatedData = oldData?.data?.map((habit) => habit._id === itemId ? { ...habit, completed } : habit);
        return { ...oldData, data: updatedData, }
      });
      return { prevHabits }; // Return the snapshot for error rollback
    },
    onError: (err, { itemId }, context) => {
      // Rollback if error occurs
      if (context?.prevHabits) {
        queryClient.setQueryData([HABIT_QUERY_KEY], context.prevHabits);
      }
    },
    onSettled: () => {
      // Sync with server
      queryClient.invalidateQueries([HABIT_QUERY_KEY]);
    },
  });

  return (
    <CommonList
      items={habits}
      itemType={ITEM_TYPES.HABIT}
      onDelete={deleteMutation.mutate}
      onToggle={toggleMutation.mutate}
    />
  )
};

const HabitsPage = () => {
  const {
    data: habits,
    isLoading,
    error
  } = useQuery({
    queryKey: [HABIT_QUERY_KEY], // Unique cache key
    queryFn: getHabits, // Calls Axios function
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const userId = habits.data?.[0]?.userId || '6820e188c8970fadd5b3d4ce'; // TODO: update userId fetch. rm default Id

  return (
    <Flex
      flexDirection={'column'}
      p={4}
      borderRadius={'md'}
      bg='gray.100' // light mode color
      _dark={{ bg: 'gray.700'}} // dark mode override
    >
      <Box>
        <Text fontSize={'xl'}>Habit List</Text>
      </Box>
      <HabitInputContainer userId={userId} />
      <HabitsListContainer habits={habits.data} />
    </Flex>
  );
};

export default HabitsPage;
