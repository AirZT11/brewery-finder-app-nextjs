import { Flex } from "@chakra-ui/react"
import { FC } from "react"
import { useSelector } from "react-redux"
import { useUserLocation } from "../../hooks/useUserLocation"
import {
  apiSlice,
  useGetBreweriesByLocationQuery,
} from "../../store/features/api/apiSlice"
import BreweryListView from "../brewery-list-view/brewery-list-view"
import SearchView from "../search-view/search-view"
import { BreweryListContainerViewProps } from "./brewery-list-container-view.props"

const BreweryListContainerView: FC<BreweryListContainerViewProps> = () => {
  return (
    <Flex direction="column" background="pink" p="8">
      <h1>BreweryListContainerView</h1>
      <SearchView />
      <BreweryListView />
    </Flex>
  )
}

export default BreweryListContainerView
