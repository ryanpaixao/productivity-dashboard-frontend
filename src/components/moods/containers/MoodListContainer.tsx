import { useMutation, useQueryClient } from '@tanstack/react-query';

// API
import { deleteMood } from '../../../api/moodsAPI';
import { MOOD_QUERY_KEY } from '../../../api/constants/moodQueryKey';
// Components
import MoodList from '../MoodList';

export type MoodItem = {
  userId: string;
  rating: number | null;
  createdAt: string | Date;
  _id: string;
}

type MoodListContainerProps = {
  moods: {
    data: MoodItem[];
    [key: string]: any;
  };
};

const MoodListContainer = ({ moods }: MoodListContainerProps) => {
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
    />
  );
};

export default MoodListContainer;
