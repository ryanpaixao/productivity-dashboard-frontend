import { useState } from 'react';
import { Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { FaAngry, FaGrin, FaFrown, FaMeh, FaSmile } from "react-icons/fa";

const moods = [
  { id: 1, label: "Angry", icon: <FaAngry />, checked: false },
  { id: 2, label: "Sad", icon: <FaFrown />, checked: false },
  { id: 3, label: "Neutral", icon: <FaMeh />, checked: false },
  { id: 4, label: "Happy", icon: <FaSmile />, checked: false },  
  { id: 5, label: "Excited", icon: <FaGrin />, checked: false },
];

const MoodButtons = ({ onMoodSelection }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const direction = useBreakpointValue({ base: 'column', md: 'row' });

  const onClick = (id, label) => {
    onMoodSelection(id);
    setSelectedMood(label);
  };

  return (
    <Flex
      direction={direction}
      gap={2}
      width={'100%'}
      align={'stretch'}
    >
      {moods.map((mood) => (
        <Button 
          key={mood.id}
          mr={2}
          onClick={() => onClick(mood.id, mood.label)}
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
      {selectedMood && <Text mt={2}>You're feeling <strong>{selectedMood}</strong> today.</Text>}
    </Flex>
  )
};

export default MoodButtons;
