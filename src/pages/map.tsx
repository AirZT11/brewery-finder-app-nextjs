import { Container, Flex, Heading } from "@chakra-ui/react"
import { MapProvider } from "react-map-gl"
import BreweryListContainerView from "../components/brewery-list-container-view/brewery-list-container-view"
import Layout from "../components/layout/layout"
import MapView from "../components/map-view/map-view"
import { wrapper } from "../store/store"

const MapPage = () => {
  return (
    <Layout>
      <Flex direction={{ base: "column-reverse", md: "row" }} h="100%" w="100%">
        <BreweryListContainerView />
        <MapView />
      </Flex>
    </Layout>
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
