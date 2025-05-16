import { Divider, FormControl, UnorderedList } from '@chakra-ui/react';

import TasksListItem from './TasksListItem.jsx';

const TasksList = ({ tasks = [], onDelete, onToggle }) => {
  return (
    <FormControl flexDirection={'column'} pb={4}>
      <Divider />
      <UnorderedList>
        {tasks.map((task) => {
          return <TasksListItem key={task._id} task={task} onDelete={onDelete} onToggle={onToggle} />
        })}
      </UnorderedList>
    </FormControl>
  )
};

export default TasksList;
