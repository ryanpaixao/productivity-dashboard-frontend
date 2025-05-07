import { useState } from 'react';
import { Button, Box, Divider, Heading, Text } from '@chakra-ui/react';

import Tasks from './components/Tasks';
import Habits from './components/Habits';
import Mood from './components/Mood';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <>
      <Box display="flex" w="100vw" flexDirection="column" alignContent={"stretch"}>
        <Box pr={4} pl={4} display="flex" flexDirection="column" w="100%">
          <header>
            <Heading pt={4} pb={2} as="h1" textAlign={"center"}><Text>My Productivity Dashboard</Text></Heading>
            <Text pb={4} fontSize={"lg"} textAlign={"center"}>Today's quote: "Small steps lead to big results."</Text>
          </header>
          <Divider />
        </Box>
        <Box display="flex" w="100%" flexDirection="column">
          <nav>
            <Box display="flex" flexDirection="row" w="100%" justifyContent="start" bg="gray.100">
              <Box p={4}>
                <Button colorScheme="teal" onClick={() => setActiveTab('tasks')}>Tasks</Button>
              </Box>
              <Box p={4}>
                <Button colorScheme="teal" onClick={() => setActiveTab('habits')}>Habits</Button>
              </Box>
              <Box p={4}>
                <Button colorScheme="teal" onClick={() => setActiveTab('mood')}>Mood</Button>
              </Box>
            </Box>
          </nav>
          <Divider />
        </Box>
        <Box display="flex" w="100%" flexDirection="column" p={4}>
          <main>
            {activeTab === 'tasks' && <Tasks />}
            {activeTab === 'habits' && <Habits />}
            {activeTab === 'mood' && <Mood />}
          </main>
        </Box>
      </Box>
    </>
  )
}
