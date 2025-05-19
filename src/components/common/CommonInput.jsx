import { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';

const CommonInput = ({ setNewItem, isSubmitting, itemType = 'task' }) => {
  const [title, updateTitle] = useState('');
  const toast = useToast();
  const capitalizedItemType = itemType.charAt(0).toUpperCase() + itemType.slice(1);

  const resetTitle = () => updateTitle('');
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if(!title.trim()) {
      toast({
        title: `${capitalizedItemType} title cannot be empty`,
        status: 'error'
      });
      return;
    }

    setNewItem({ title: title.trim(), resetTitle: resetTitle });
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor={`${itemType}-input-field`}>{`${capitalizedItemType} Title`}</FormLabel>
            <Input
              type='text'
              value={title}
              onChange={(e) => updateTitle(e.target.value)}
              placeholder={`Add a new ${itemType}`}
              colorScheme="teal"
              isDisabled={isSubmitting}
              id={`${itemType}-input-field`}
            />
          </FormControl>
          <Flex direction={{ base: 'column', md: 'row' }} gap={3}>
            <Button
              type='submit'
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              colorScheme="teal"
              flex='1'
            >
              {`Add ${capitalizedItemType}`}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default CommonInput;
