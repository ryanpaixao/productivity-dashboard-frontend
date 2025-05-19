import { Divider, FormControl, UnorderedList } from '@chakra-ui/react';

import CommonListItem from './CommonListItem.jsx';

const CommonList = ({ items = [], onDelete, onToggle, itemType }) => {
  return (
    <FormControl flexDirection={'column'} pb={4}>
      <Divider />
      <UnorderedList>
        {items.map((item) => {
          return <CommonListItem key={item._id} item={item} onDelete={onDelete} onToggle={onToggle} itemType={itemType} />
        })}
      </UnorderedList>
    </FormControl>
  )
};

export default CommonList;
