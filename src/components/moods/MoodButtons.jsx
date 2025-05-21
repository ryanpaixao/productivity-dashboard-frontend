import { useState } from 'react';
import { Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react';

import MoodIcons from './MoodIcons';

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
      mb={4}
      width={'100%'}
      align={'stretch'}
    >
      {MoodIcons.map((mood) => (
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
