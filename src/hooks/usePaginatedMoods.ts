import { useQuery } from '@tanstack/react-query';

// API
import { getPaginatedMoods } from '../api/moodsAPI';
import { MOOD_QUERY_KEY } from '../api/constants/moodQueryKey';

const usePaginatedMoods = (userId, page, limit = 15) => {
  return useQuery({
    queryKey: [MOOD_QUERY_KEY, userId, page, limit],
    queryFn: () => getPaginatedMoods(userId, page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export { usePaginatedMoods };
