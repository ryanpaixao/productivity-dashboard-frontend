import { useState, useEffect } from 'react';
import { Button, Box, Checkbox, Divider, Flex, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react';

export default function Habits() {
  const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
  const [habits, setHabits] = useState(savedHabits);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { id: Date.now(), name: newHabit, checked: false }]);
      setNewHabit('');
    }
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(
      habit => habit.id === id
        ? { ...habit, checked: !habit.checked }
        : habit
    ));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <Flex
      flexDirection={'column'}
      p={4}
      borderRadius={'md'}
      bg='gray.100' // light mode color
      _dark={{ bg: 'gray.700'}} // dark mode override
    >
      <Box>
        <Text fontSize={'xl'}>Habit Tracker</Text>
      </Box>
      <Flex pt={4} pb={4} justifyContent={'space-between'}>
        <Box>
          <Input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new habit"
            colorScheme="teal"
          />
        </Box>
        <Box>
          <Button colorScheme="teal" onClick={addHabit}>Add Habit</Button>
        </Box>
      </Flex>
      <Flex flexDirection={'column'} pb={4}>
        <Divider />
        <UnorderedList>
          {habits.map(habit => (
            <ListItem display='flex' flexDirection={'column'} justifyContent={'space-between'} pt={2} pb={2} key={habit.id}>
              <Flex flexDirection={'row'} justifyContent={'space-between'} pb={2}>
                <Flex flexDirection={'row'}>
                  <Checkbox
                    colorScheme="teal"
                    isChecked={habit.checked}
                    onChange={() => toggleHabit(habit.id)}
                  />
                  <Text p={2}>{habit.name}</Text>
                </Flex>
                <Box>
                  <Button ml={6} colorScheme="red" onClick={() => deleteHabit(habit.id)}>Delete</Button>
                </Box>
              </Flex>
              <Divider />
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    </Flex>
  );
}
