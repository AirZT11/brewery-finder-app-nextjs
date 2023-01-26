import { Container, Flex, Heading } from "@chakra-ui/react"
import BreweryListContainerView from "../components/brewery-list-containter-view/brewery-list-container-view"
import MapView from "../components/map-view/map-view"

const MapPage = () => {
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

export async function getServerSideProps() {
  return {
    props: {},
  }
}
