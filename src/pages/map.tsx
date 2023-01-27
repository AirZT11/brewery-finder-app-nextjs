import { Container, Flex, Heading } from "@chakra-ui/react"
import BreweryListContainerView from "../components/brewery-list-container-view/brewery-list-container-view"
import MapView from "../components/map-view/map-view"
import {
  getBreweriesByLocation,
  getRunningQueriesThunk,
  useGetBreweriesByLocationQuery,
} from "../store/features/breweriesApiSlice"
import { wrapper } from "../store/store"

const MapPage = () => {
  const { data, error, isLoading } = useGetBreweriesByLocationQuery({
    lat: "40.678177",
    lng: "-73.944160",
  })
  return (
    <Container>
      <Flex direction="row">
        <BreweryListContainerView />
        <MapView />
      </Flex>
    </Container>
  )
}

export default MapPage

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // const name = context.params?.name;
    if (typeof name === "string") {
      store.dispatch(
        getBreweriesByLocation.initiate({
          lat: "40.678177",
          lng: "-73.944160",
        })
      )
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
)
