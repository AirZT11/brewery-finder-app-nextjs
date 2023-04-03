import { Box, Flex } from "@chakra-ui/react"
import { FC } from "react"
import { useAppSelector } from "../../store/hooks"
import BreweryListView from "../brewery-list-view/brewery-list-view"
import SearchView from "../search-view/search-view"
import { BreweryListContainerViewProps } from "./brewery-list-container-view.props"

const BreweryListContainerView: FC<BreweryListContainerViewProps> = () => {
  const breweries = useAppSelector((state) => state.breweries.breweriesList)

  return (
    <Flex
      opacity=".93"
      direction="column"
      background="background.100"
      h={breweries.length > 0 ? "100%" : "inherit"}
      overflow="scroll"
      minW={{ base: "full", md: "400px" }}
      borderRadius="8"
      boxShadow={"md"}
    >
      <Flex
        position="sticky"
        top="0"
        bg="background.300"
        zIndex="100"
        px="4"
        pb={2}
        pt={{ base: 3, md: 2 }}
        boxShadow="lg"
      >
        <SearchView />
      </Flex>
      {breweries && <BreweryListView />}
    </Flex>
  )
}

export default BreweryListContainerView
