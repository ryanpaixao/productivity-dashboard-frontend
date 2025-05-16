import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Flex, Text } from '@chakra-ui/react';

// API calls
import { getTasks, createTask, deleteTask, updateTask } from '../api/tasksAPI';

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
      queryClient.invalidateQueries([TASK_QUERY_KEY]);
    },
  });

  // Toggle Task mutation
  const toggleMutation = useMutation({
    mutationFn: updateTask,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries([TASK_QUERY_KEY]); // Cancel ongoing fetches
      const prevTasks = queryClient.getQueryData([TASK_QUERY_KEY]); // Snapshot

      // Optimistically update UI
      queryClient.setQueryData([TASK_QUERY_KEY], (old) =>
        old.map((task) =>
          task._id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
      return { prevTasks }; // Rollback on error
    },
    onError: (err, taskId, context) => {
      queryClient.setQueryData([TASK_QUERY_KEY], context.prevTasks); // Revert on fail
    },
    onSettled: () => {
      queryClient.invalidateQueries(['tasks']); // Sync with server
    },
  });

  return (
    <TasksList tasks={tasks} onDelete={deleteMutation.mutate} onToggle={toggleMutation.mutate} />
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
  const userId = tasks.data?.[0]?.userId || '6820e188c8970fadd5b3d4ce';

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
