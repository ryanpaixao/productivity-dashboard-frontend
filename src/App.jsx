import { Divider, Flex, Heading, Text } from '@chakra-ui/react';

import PageContainerWNavigation from './pages/PageContainerWNavigation';

export default function App() {
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
        <PageContainerWNavigation />
      </Flex>
    </>
  )
}
