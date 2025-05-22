import { useState, useEffect } from 'react';
import { Button, Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';

// Pages
import Tasks from '../pages/Tasks';
import Habits from '../pages/Habits';
import Moods from '../pages/Moods';
import Trends from '../pages/Trends';

// Components
import { ThemeToggle } from './ThemeToggle';

// Constants
import PAGES from '../constants/PAGES';

const NavigationTab = () => {
  const savedTab = localStorage.getItem('activeTab');
  const [activeTab, setActiveTab] = useState(savedTab || PAGES.TASKS);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <>
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
              <Button isActive={activeTab === PAGES.TASKS} colorScheme="teal" onClick={() => setActiveTab(PAGES.TASKS)}>Tasks</Button>
            </Box>
            <Box p={4}>
              <Button isActive={activeTab === PAGES.HABITS} colorScheme="teal" onClick={() => setActiveTab(PAGES.HABITS)}>Habits</Button>
            </Box>
            <Box p={4}>
              <Button isActive={activeTab === PAGES.MOODS} colorScheme="teal" onClick={() => setActiveTab(PAGES.MOODS)}>Mood</Button>
            </Box>
            <Box p={4}>
              <Button isActive={activeTab === PAGES.TRENDS} colorScheme="teal" onClick={() => setActiveTab(PAGES.TRENDS)}>Trends</Button>
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
          {activeTab === PAGES.TASKS && <Tasks />}
          {activeTab === PAGES.HABITS && <Habits />}
          {activeTab === PAGES.MOODS && <Moods />}
          {activeTab === PAGES.TRENDS && <Trends />}
        </main>
      </Flex>
    </>
  )
};

export default NavigationTab;
