import { useQuery } from '@tanstack/react-query';

// API
import { getMoodTrends } from '../api/moodsAPI';

// CONSTANT
import { MOOD_TREND_QUERY_KEY } from '../api/constants/moodTrendQueryKey';
const userId = '6820e188c8970fadd5b3d4ce'; // TODO: Make me dynamic

const useMoodTrendsData = (timeframe: string) => {
  return useQuery({
    queryKey: [MOOD_TREND_QUERY_KEY, timeframe],
    queryFn: () => getMoodTrends(userId, timeframe),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export { useMoodTrendsData, MOOD_TREND_QUERY_KEY };
