import { Divider, FormControl, UnorderedList } from '@chakra-ui/react';

import MoodListItem from './MoodListItem';

const MoodList = ({ items = [], onDelete }) => {
  return (
    <FormControl flexDirection={'column'} pb={4}>
      <Divider />
      <UnorderedList>
        {items.map((item) => {
          return <MoodListItem key={item._id} item={item} onDelete={onDelete} />
        })}
      </UnorderedList>
    </FormControl>
  )
};

export default MoodList;
