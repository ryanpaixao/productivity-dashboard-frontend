import { Flex, Button, Text } from '@chakra-ui/react';

// Type
import { MoodItem } from '../../types/MoodItem';

type Pagination = {
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

type Moods = {
  pagination?: Pagination;
  data: MoodItem[];
};

type MoodPaginationButtonsProps = {
  moods: Moods;
  page: number;
  setPage: (page: number | ((old: number) => number)) => void;
};

const MoodPaginationButtons = ({ moods, page, setPage }: MoodPaginationButtonsProps) => {
  return (
    <Flex alignItems={'center'}>
      <Button
        onClick={() => setPage(old => Math.max(old - 1, 1))}
        disabled={page === 1}
        mr={4}
      >
        <Text>Previous</Text>
      </Button>
      <Text mr={4}>
        Page {page} of {moods?.pagination?.totalPages}
      </Text>
      <Button
        onClick={() => setPage(old =>
          !moods?.pagination || moods?.pagination?.totalPages > page
            ? old + 1
            : old
        )}
        disabled={!moods?.pagination || page >= moods?.pagination?.totalPages}
      >
        <Text>Next</Text>
      </Button>
    </Flex>
  );
};

export default MoodPaginationButtons;
