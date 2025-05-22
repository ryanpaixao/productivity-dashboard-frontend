import { Box } from '@chakra-ui/react';

import { TrendsChart } from '../components/TrendsChart';
import { mockMoodData, mockHabitData } from '../demo-data/mood-habit-demo-data'; // TODO: Replace me with real data in future.

export default function Trends() {
  return (
    <Box>
      <TrendsChart moodData={mockMoodData} habitData={mockHabitData} />
    </Box>
  );
};
