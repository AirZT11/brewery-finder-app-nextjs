import { Container, Flex, Heading } from "@chakra-ui/react"
import BreweryListContainerView from "../src/components/brewery-list-containter-view/brewery-list-container-view"
import MapView from "../src/components/map-view/map-view"

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
