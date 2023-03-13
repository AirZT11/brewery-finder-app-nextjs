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
      // p="8"
      h="100vh"
      overflow="scroll"
    >
      <SearchView />
      <BreweryListView />
    </Flex>
  )
}

export default BreweryListContainerView
