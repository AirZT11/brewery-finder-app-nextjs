import { Flex, Spinner } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { FC } from "react"
import { useSelector } from "react-redux"
import { useUserLocation } from "../../hooks/useUserLocation"
import { useGetBreweriesByLocationQuery } from "../../store/features/api/breweriesApiSlice"
import { useGetRatingsQuery } from "../../store/features/api/ratingsApiSlice"
import { useAppSelector } from "../../store/hooks"
import BreweryCard from "../brewery-card/brewery-card"
import { BreweryListViewProps } from "./brewery-list-view.props"

const BreweryListView: FC<BreweryListViewProps> = ({}) => {
  const { location, loading } = useUserLocation()
  useGetBreweriesByLocationQuery(location, {
    skip: loading,
  })
  const breweries = useAppSelector((state) => state.breweries.breweriesList)
  const breweryIds = breweries.map((brew) => brew.id)
  const ratings = useGetRatingsQuery(breweryIds, {
    skip: breweryIds.length < 1,
  })
  console.log("!@ ratings from RTK Hook: ", ratings)
  const user = useUser()
  // console.log("!@ user", user)

  loading && <Spinner />
  return (
    <Flex direction="column">
      {breweries &&
        breweries.map((brewery) => (
          <BreweryCard key={brewery.id} brewery={brewery} user={user} />
        ))}
    </Flex>
  )
}

export default BreweryListView
