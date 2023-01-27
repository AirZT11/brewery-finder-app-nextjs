import { Flex } from "@chakra-ui/react"
import { FC } from "react"
import BreweryCard from "../brewery-card/brewery-card"
import { BreweryListViewProps } from "./brewery-list-view.props"

const BreweryListView: FC<BreweryListViewProps> = ({ breweries }) => {
  return (
    <Flex direction="column">
      <h1>BreweryListView</h1>
      {}
      <BreweryCard />
    </Flex>
  )
}

export default BreweryListView
