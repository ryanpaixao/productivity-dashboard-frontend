import { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';

const TaskInput = ({ setNewTask, isSubmitting }) => {
  const [taskTitle, updateTask] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if(!taskTitle.trim()) {
      toast({ title: 'Task title cannot be empty', status: 'error' });
      return;
    }

    setNewTask(taskTitle);
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="task">Task Title</FormLabel>
            <Input
              type='text'
              value={taskTitle}
              onChange={(e) => updateTask(e.target.value)}
              placeholder="Add a new task"
              colorScheme="teal"
              isDisabled={isSubmitting}
            />
          </FormControl>
          <Flex direction={{ base: 'column', md: 'row' }} gap={3}>
            <Button
              type='submit'
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              colorScheme="teal"
              flex='1'
            >
              Add Task
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default TaskInput;
