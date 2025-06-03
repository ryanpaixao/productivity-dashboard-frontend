import { useMutation, useQueryClient } from '@tanstack/react-query';

// API
import { deleteMood } from '../../../api/moodsAPI';
import { MOOD_QUERY_KEY } from '../../../api/constants/moodQueryKey';
// Components
import MoodList from '../MoodList';

// Types
import type { MoodItem } from '../../../types/MoodItem';

type MoodListContainerProps = {
  moods: {
    data: MoodItem[];
    [key: string]: any;
  };
  indexOffset: number;
};

const MoodListContainer = ({ moods, indexOffset }: MoodListContainerProps) => {
  const { data: items } = moods;
  const queryClient = useQueryClient();

  // Delete Mood mutation
  const deleteMutation = useMutation({
    mutationFn: deleteMood,
    onSuccess: () => {
      // Invalidate cache and refetch mood after success
      queryClient.invalidateQueries({ queryKey: [MOOD_QUERY_KEY] });
    },
    // TODO: Add error handling. toast popup
  });

  return (
    <MoodList
      items={items}
      onDelete={deleteMutation.mutate}
      indexOffset={indexOffset}
    />
  );
};

export default MoodListContainer;
