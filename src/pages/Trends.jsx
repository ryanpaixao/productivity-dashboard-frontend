import { Box } from '@chakra-ui/react';

// API calls
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMoods } from '../api/moodsAPI';

import { TrendsChart } from '../components/trends/TrendsChart';

const TRENDS_MOODS_QUERY_KEY = 'trendsMoods';

export default function Trends() {
  const {
    data: moods,
    isLoading,
    error
  } = useQuery({
    queryKey: [TRENDS_MOODS_QUERY_KEY], // Unique cache key
    queryFn: getMoods, // Calls Axios function
  });

  return (
    <Box>
      <TrendsChart moodData={moods?.data} />
    </Box>
  );
};
