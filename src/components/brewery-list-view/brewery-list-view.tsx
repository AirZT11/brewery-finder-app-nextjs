import { Flex, Spinner } from "@chakra-ui/react"
import { FC } from "react"
import { useUserLocation } from "../../hooks/useUserLocation"
import { useGetBreweriesByLocationQuery } from "../../store/features/api/apiSlice"
import BreweryCard from "../brewery-card/brewery-card"
import { BreweryListViewProps } from "./brewery-list-view.props"

const BreweryListView: FC<BreweryListViewProps> = ({}) => {
  const { location, loading } = useUserLocation()
  const { data: breweries, isLoading } = useGetBreweriesByLocationQuery(
    location,
    {
      skip: loading,
    }
  )

  isLoading && <Spinner />
  return (
    <Flex direction="column">
      {breweries &&
        breweries.map((brewery) => (
          <BreweryCard key={brewery.id} brewery={brewery} />
        ))}
    </Flex>
  )
}

export default BreweryListView
