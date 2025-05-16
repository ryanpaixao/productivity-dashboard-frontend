import { Checkbox, Divider, Flex, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const TasksListItem = ({ task = {}, deleteTask, toggleTask }) => {
  const hoverBg = useColorModeValue('gray.50', 'gray.600');

  return (
    <>
      <Stack
        align='center'
        p={2}
        _hover={{ bg: hoverBg }}
        direction={'row'}
      >
        <Stack flex='1' direction={'row'} gap={4} align='center'>
          <Checkbox
            isChecked={task.completed}
            onChange={() => toggleTask(task._id)}
            colorScheme="teal"
          />
          <Text flex='1' textDecoration={task.completed ? 'line-through' : 'none'}>
            {task.title}
          </Text>
        </Stack> 
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => deleteTask(task._id)}
          aria-label='Delete task'
          colorScheme='red'
          size='sm'
        />
      </Stack>
      <Divider />
    </>
  )
};

export default TasksListItem;
