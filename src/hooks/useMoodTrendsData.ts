import { useQuery } from '@tanstack/react-query';

// API
import { getMoodTrends } from '../api/moodsAPI';

// CONSTANT
const MOOD_TREND_QUERY_KEY = 'moodTrendData';
const userId = '6820e188c8970fadd5b3d4ce'; // TODO: Make me dynamic

const fetchMoodTrendsData = async (timeframe: string) => {
  const response = await getMoodTrends(userId, timeframe);

  if (!(response.status === 200 || response.status === 201)) throw new Error('Network response was not ok');
  return response.data;
};

const useMoodTrendsData = (timeframe: string) => {
  return useQuery({
    queryKey: [MOOD_TREND_QUERY_KEY, timeframe],
    queryFn: () => fetchMoodTrendsData(timeframe),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export { useMoodTrendsData, MOOD_TREND_QUERY_KEY };
