import { useState } from 'react';
import { Button, Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';

import Tasks from './pages/Tasks';
import Habits from './pages/Habits';
import Mood from './pages/Mood';
import { ThemeToggle } from './components/ThemeToggle';
import Dashboard from './pages/Dashboard'

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <>
      <Flex w="100vw" flexDirection="column" alignContent={"stretch"}>
        <Flex pr={4} pl={4} flexDirection="column" w="100%">
          <header>
            <Heading pt={4} pb={2} as="h1" textAlign={"center"}><Text>My Productivity Dashboard</Text></Heading>
            <Text pb={4} fontSize={"lg"} textAlign={"center"}>Today's quote: "Small steps lead to big results."</Text>
          </header>
        </Flex>
        <Divider />
        <Flex
          w="100%"
          flexDirection="column"
          bg='gray.100' // light mode color
          _dark={{ bg: 'gray.700'}} // dark mode override
        >
          <Flex flexDir={'row'} justifyContent="center">
            <Flex
              flexDirection="row"
              w="100%"
              justifyContent="start"
            >
              <Box p={4}>
                <Button isActive={activeTab === 'tasks'} colorScheme="teal" onClick={() => setActiveTab('tasks')}>Tasks</Button>
              </Box>
              <Box p={4}>
                <Button isActive={activeTab === 'habits'} colorScheme="teal" onClick={() => setActiveTab('habits')}>Habits</Button>
              </Box>
              <Box p={4}>
                <Button isActive={activeTab === 'mood'} colorScheme="teal" onClick={() => setActiveTab('mood')}>Mood</Button>
              </Box>
              <Box p={4}>
                <Button isActive={activeTab === 'trends'} colorScheme="teal" onClick={() => setActiveTab('trends')}>Trends</Button>
              </Box>
            </Flex>
            <Flex>
              <ThemeToggle />
            </Flex>
          </Flex>
          <Divider />
        </Flex>
        <Flex w="100%" flexDirection="column" p={4}>
          <main>
            {activeTab === 'tasks' && <Tasks />}
            {activeTab === 'habits' && <Habits />}
            {activeTab === 'mood' && <Mood />}
            {activeTab === 'trends' && <Dashboard />}
          </main>
        </Flex>
      </Flex>
    </>
  )
}
