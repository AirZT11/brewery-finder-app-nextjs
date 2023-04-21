import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useState } from "react"
import Login from "./login"
import Signup from "./signup"

interface InitialTabMap {
  login: 0
  signup: 1
}

type InitialTab = keyof InitialTabMap

type AuthProps = {
  initialTab?: InitialTab
}

const initialTabMap: InitialTabMap = {
  login: 0,
  signup: 1,
}

export default function Auth({ initialTab = "login" }: AuthProps) {
  const initialTabIndex = initialTabMap[initialTab]

  return (
    <Flex
      flexDirection="column"
      w="full"
      align={{ base: "auto", md: "center" }}
    >
      <Tabs
        size="md"
        variant="enclosed"
        isFitted
        defaultIndex={initialTabIndex}
      >
        <TabList>
          <Tab _selected={{ color: "white", bg: "black" }} bg="white">
            Login
          </Tab>
          <Tab _selected={{ color: "white", bg: "black" }} bg="white">
            Signup
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
