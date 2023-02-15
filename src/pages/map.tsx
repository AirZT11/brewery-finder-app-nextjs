import { Container, Flex, Heading } from "@chakra-ui/react"
import { useStore } from "react-redux"
import BreweryListContainerView from "../components/brewery-list-container-view/brewery-list-container-view"
import MapView from "../components/map-view/map-view"
import { useUserLocation } from "../hooks/useUserLocation"
import { useGetBreweriesByLocationQuery } from "../store/features/api/apiSlice"
// import {
//   getBreweriesByLocation,
//   getRunningQueriesThunk,
//   useGetBreweriesByLocationQuery,
// } from "../store/features/api/apiSlice"
import { wrapper } from "../store/store"

const MapPage = () => {
  const { location, error, loading } = useUserLocation()
  const { data } = useGetBreweriesByLocationQuery(
    {
      lat: location ? location.lat : 40.678177,
      lng: location ? location.lng : -73.94416,
    },
    { skip: loading }
  )

  return (
    <Flex direction="row" h="100%" w="100%">
      <BreweryListContainerView />
      <MapView />
    </Flex>
  )
}

export default MapPage

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // const name = context.params?.name;
    // if (typeof name === "string") {
    // const userLocation = navigator.geolocation.getCurrentPosition(
    //   (position) => console.log(position, "SUCCESS"),
    //   () => console.log("POSITION ERROR")
    // )
    // store.dispatch(
    //   getBreweriesByLocation.initiate({
    //     lat: "40.678177",
    //     lng: "-73.944160",
    //   })
    // )
    // }

    // await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
)
