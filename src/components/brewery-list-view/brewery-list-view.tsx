import { Flex, Heading, Spinner } from "@chakra-ui/react"
import { FC } from "react"
import { useUserLocation } from "../../hooks/useUserLocation"
import { useGetBreweriesByLocationQuery } from "../../store/features/api/breweriesApiSlice"
import { useGetRatingsQuery } from "../../store/features/api/ratingsApiSlice"
import { useAppSelector } from "../../store/hooks"
import BreweryCard from "../brewery-card/brewery-card"
import { BreweryListViewProps } from "./brewery-list-view.props"

const BreweryListView: FC<BreweryListViewProps> = ({}) => {
  const { location, loading } = useUserLocation()
  // useGetBreweriesByLocationQuery(location, {
  //   skip: loading,
  // })
  // TODO: Move this logic into the ratings slice
  const breweries = useAppSelector((state) => state.breweries.breweriesList)
  const breweryIds = breweries.map((brew) => brew.id)
  useGetRatingsQuery(breweryIds, {
    skip: breweryIds.length < 1,
  })

  loading && <Spinner />
  return (
    <Flex direction="column">
      {/* TODO: If no breweries are returned from query, display prompt */}
      {/* {!breweries.length && <Heading>No breweries found</Heading>} */}
      {breweries &&
        breweries.map((brewery) => (
          <BreweryCard key={brewery.id} brewery={brewery} />
        ))}
    </Flex>
  )
}

export default BreweryListView
