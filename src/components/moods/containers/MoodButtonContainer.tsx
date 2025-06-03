import { useMutation, useQueryClient } from '@tanstack/react-query';

// Components
import MoodButtons from '../MoodButtons';

// API
import { createMood } from '../../../api/moodsAPI';
import { MOOD_QUERY_KEY } from '../../../api/constants/moodQueryKey';

const MoodButtonContainer = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();

  // Add new Mood
  const mutation = useMutation({
    mutationFn: createMood,
    onSuccess: (_, params, context) => {
      // Invalidate cache and refetch moods after success
      queryClient.invalidateQueries({ queryKey: [MOOD_QUERY_KEY] });
    },
  });
  const onMoodSelection = (rating: number) => {
    mutation.mutate({
      userId,
      rating,
      createdAt: new Date().toISOString()
    })
  };

  return <MoodButtons onMoodSelection={onMoodSelection} />
};

export default MoodButtonContainer;
