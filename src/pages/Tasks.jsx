import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Flex, Text } from '@chakra-ui/react';

// API calls
import { getTasks, createTask, deleteTask, toggleTask } from '../api/tasksAPI';

// Common Components
import CommonList from '../components/common/CommonList';
import CommonInput from '../components/common/CommonInput';

// Constants
import ITEM_TYPES from '../constants/ITEM_TYPES';
const TASK_QUERY_KEY = 'tasks';

const TaskInputContainer = ({ userId }) => {
  const queryClient = useQueryClient();

  // Add task mutation
  const mutation = useMutation({
    mutationFn: ({ taskPayload }) => createTask(taskPayload),
    onSuccess: (_, params, context) => {
      // Invalidate cache and refetch tasks after success
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
      // Clear text Field
      params.resetTitle();
    },
  });

  const setNewTask = ({ title, resetTitle }) => {
    mutation.mutate({
      taskPayload: {
        userId, // TODO: auto inject userId
        title,
        completed: false,
      },
      resetTitle,
    })
  };

  return <CommonInput itemType={ITEM_TYPES.TASK} setNewItem={setNewTask} isSubmitting={mutation.isPending} />
};

const TasksListContainer = ({ tasks }) => {
  const queryClient = useQueryClient();

  // Delete Task mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // Invalidate cache and refetch tasks after success
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
    },
    // TODO: Add error handling. toast popup
  });

  // Toggle Task mutation
  const toggleMutation = useMutation({
    mutationFn: ({ itemId, completed }) => toggleTask(itemId, completed),
    onMutate: async ({ itemId, completed }) => {
      // Cancel ongoing queries
      await queryClient.cancelQueries([TASK_QUERY_KEY]);
      // Snapshot previous state
      const prevTasks = queryClient.getQueryData([TASK_QUERY_KEY]);

      // Optimistically update UI
      queryClient.setQueryData([TASK_QUERY_KEY], (oldData) => {
        const updatedData = oldData?.data?.map((task) => task._id === itemId ? { ...task, completed } : task);
        return { ...oldData, data: updatedData, }
      });
      return { prevTasks }; // Return the snapshot for error rollback
    },
    onError: (err, { itemId }, context) => {
      // Rollback if error occurs
      if (context?.prevTasks) {
        queryClient.setQueryData([TASK_QUERY_KEY], context.prevTasks);
      }
    },
    onSettled: () => {
      // Sync with server
      queryClient.invalidateQueries([TASK_QUERY_KEY]);
    },
  });

  return (
    <CommonList
      items={tasks}
      itemType={ITEM_TYPES.TASK}
      onDelete={deleteMutation.mutate}
      onToggle={toggleMutation.mutate}
    />
  )
};

const TasksPage = () => {
  const {
    data: tasks,
    isLoading,
    error
  } = useQuery({
    queryKey: [TASK_QUERY_KEY], // Unique cache key
    queryFn: getTasks, // Calls Axios function
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const userId = tasks.data?.[0]?.userId || '6820e188c8970fadd5b3d4ce'; // TODO: update userId fetch. rm default Id

  return (
    <Flex
      flexDirection={'column'}
      p={4}
      borderRadius={'md'}
      bg='gray.100' // light mode color
      _dark={{ bg: 'gray.700'}} // dark mode override
    >
      <Box>
        <Text fontSize={'xl'}>Task List</Text>
      </Box>
      <TaskInputContainer userId={userId} />
      <TasksListContainer tasks={tasks.data} />
    </Flex>
  );
};

export default TasksPage;
