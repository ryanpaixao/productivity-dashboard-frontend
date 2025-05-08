import { useEffect, useState } from 'react';
import { Button, Box, Checkbox, Divider, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react';

export default function Tasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(savedTasks);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(
      task => task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box>
        <Text fontSize={'xl'}>Task List</Text>
      </Box>
      <Box pt={4} pb={4} display={'flex'} justifyContent={'space-between'}>
        <Box>
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            colorScheme="teal"
          />
        </Box>
        <Box>
          <Button colorScheme="teal" onClick={addTask}>Add Task</Button>
        </Box>
      </Box>
      <Box display='flex' flexDirection={'column'} pb={4}>
        <Divider />
        <UnorderedList>
          {tasks.map(task => (
            <ListItem display='flex' flexDirection={'column'} pt={2} key={task.id}>
              <Box display='flex' flexDirection={'row'} justifyContent={'space-between'} pb={2}>
                <Box display={'flex'} flexDirection={'row'}>
                  <Checkbox
                    isChecked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    colorScheme="teal"
                  />
                  <Text p={2}>{task.text}</Text>
                </Box>
                <Box>
                  <Button ml={6} colorScheme="red" onClick={() => deleteTask(task.id)}>Delete</Button>
                </Box>
              </Box>
              <Divider />
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
}
