import { Checkbox, Divider, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const CommonListItem = ({ item = {}, onDelete, onToggle, itemType }) => {
  const hoverBg = useColorModeValue('gray.50', 'gray.600');

  return (
    <>
      <Stack
        align='center'
        p={2}
        _hover={{ bg: hoverBg }}
        direction={'row'}
      >
        <Stack flex='1' direction={'row'} gap={4} align='center'>
          <Checkbox
            isChecked={item.completed}
            onChange={() => onToggle({ itemId: item._id, completed: !item.completed })}
            colorScheme="teal"
            id={`completed-checkbox-${item.title.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <Text flex='1' textDecoration={item.completed ? 'line-through' : 'none'}>
            {item.title}
          </Text>
        </Stack> 
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => onDelete(item._id)}
          aria-label={`Delete ${itemType}`}
          colorScheme='red'
          size='sm'
        />
      </Stack>
      <Divider />
    </>
  )
};

export default CommonListItem;
