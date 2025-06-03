import { Divider, FormControl, UnorderedList } from '@chakra-ui/react';

import MoodListItem from './MoodListItem';

import type { MoodItem } from '../../types/MoodItem';

type MoodListProps = {
  items: MoodItem[];
  onDelete: (id: string) => void;
  indexOffset: number;
};

const MoodList = ({ items = [], onDelete, indexOffset }: MoodListProps) => {
  return (
    <FormControl flexDirection={'column'} pb={4}>
      <Divider />
      <UnorderedList>
        {items.map((item, index) => {
          return <MoodListItem key={item._id} index={index + indexOffset} item={item} onDelete={onDelete} />
        })}
      </UnorderedList>
    </FormControl>
  )
};

export default MoodList;
