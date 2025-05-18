import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Flex, Text } from '@chakra-ui/react';

// API calls
import { getTasks, createTask, deleteTask, toggleTask } from '../api/tasksAPI';

// Task components
import TasksList from '../components/tasks/TasksList';
import TaskInput from '../components/tasks/TaskInput';

const TASK_QUERY_KEY = 'tasks';

const TaskInputContainer = ({ userId }) => {
  const queryClient = useQueryClient();

  // Add task mutation
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // Invalidate cache and refetch tasks after success
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
      // TODO: clear input after success
    },
  });

  const setNewTask = (title) => {
    mutation.mutate({
      userId, // TODO: auto inject userId
      title,
      completed: false,
    })
  };

  return <TaskInput setNewTask={setNewTask} isSubmitting={mutation.isPending} />
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
    mutationFn: ({ taskId, completed }) => toggleTask(taskId, completed),
    onMutate: async ({ taskId, completed }) => {
      // Cancel ongoing queries
      await queryClient.cancelQueries([TASK_QUERY_KEY]);
      // Snapshot previous state
      const prevTasks = queryClient.getQueryData([TASK_QUERY_KEY]);

      // Optimistically update UI
      queryClient.setQueryData([TASK_QUERY_KEY], (oldData) => {
        const updatedData = oldData?.data?.map((task) => task._id === taskId ? { ...task, completed } : task);
        return { ...oldData, data: updatedData, }
      });
      return { prevTasks }; // Return the snapshot for error rollback
    },
    onError: (err, { taskId }, context) => {
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
    <TasksList
      tasks={tasks}
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
