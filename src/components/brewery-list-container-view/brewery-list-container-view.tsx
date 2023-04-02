import { Flex } from "@chakra-ui/react"
import { FC } from "react"
import BreweryListView from "../brewery-list-view/brewery-list-view"
import SearchView from "../search-view/search-view"
import { BreweryListContainerViewProps } from "./brewery-list-container-view.props"

const BreweryListContainerView: FC<BreweryListContainerViewProps> = () => {
  return (
    <Flex
      direction="column"
      background="background.100"
      h="100%"
      overflow="scroll"
      minW={{ base: "full", md: "400px" }}
    >
      <Flex
        position="sticky"
        top="0"
        bg="background.100"
        zIndex="100"
        px="4"
        pb={2}
        pt={{ base: 3, md: 2 }}
        boxShadow="lg"
      >
        <SearchView />
      </Flex>
      <BreweryListView />
    </Flex>
  )
}

export default BreweryListContainerView
