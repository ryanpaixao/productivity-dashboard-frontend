import { useState } from "react";
import { FaSmile, FaFrown, FaMeh } from "react-icons/fa";
import { Button, Box, Divider, Text } from '@chakra-ui/react';

const moods = [
  { id: 1, label: "Happy", icon: <FaSmile />, checked: false },
  { id: 2, label: "Neutral", icon: <FaMeh />, checked: false },
  { id: 3, label: "Sad", icon: <FaFrown />, checked: false },
];

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box>
        <Text fontSize={'xl'} mb={4}>How are you feeling today?</Text>
      </Box>
      <Divider />
      <Box pt={4} pb={4} display={'flex'} justifyContent={'flex-start'}>
        {moods.map((mood) => (
          <Button 
            key={mood.id}
            mr={2}
            onClick={() => setSelectedMood(mood.label)}
            isActive={selectedMood === mood.label}
            colorScheme="teal"
            display={'flex'}
            flexDir={'row'}
            justifyContent={'space-between'}
            leftIcon={mood.icon}
          >
            <Text>{mood.label}</Text>
          </Button>
        ))}
      </Box>
    {selectedMood && <Text>You're feeling <strong>{selectedMood}</strong> today.</Text>}
    </Box>
  );
}

