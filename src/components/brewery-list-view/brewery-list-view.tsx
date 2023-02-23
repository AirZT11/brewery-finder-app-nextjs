import { Flex, Spinner } from "@chakra-ui/react"
import { FC } from "react"
import { useSelector } from "react-redux"
import { useUserLocation } from "../../hooks/useUserLocation"
import { useGetBreweriesByLocationQuery } from "../../store/features/api/breweriesApiSlice"
import { useAppSelector } from "../../store/hooks"
import BreweryCard from "../brewery-card/brewery-card"
import { BreweryListViewProps } from "./brewery-list-view.props"

const BreweryListView: FC<BreweryListViewProps> = ({}) => {
  const { location, loading } = useUserLocation()
  useGetBreweriesByLocationQuery(location, {
    skip: loading,
  })
  const breweries = useAppSelector((state) => state.breweries.breweriesList)

  loading && <Spinner />
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
