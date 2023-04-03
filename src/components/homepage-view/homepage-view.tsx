import { Flex, Heading } from "@chakra-ui/react"
import { FC } from "react"
import Layout from "../layout/layout"
import SearchView from "../search-view/search-view"
import { HomepageViewProps } from "./homepage-view.props"

export const HomepageView: FC<HomepageViewProps> = () => {
  return (
    <Layout>
      <Flex
        direction="column"
        h="full"
        align="center"
        p="4"
        mt={{ base: "10", md: "40" }}
      >
        <Flex direction="column" mb="8" align="center">
          <Heading>Welcome To</Heading>
          <Heading
            fontSize={{ base: "40px", sm: "50px", md: "70px", lg: "100px" }}
          >
            The BreweryFinder
          </Heading>
        </Flex>
        <SearchView navigateToMapOnSubmit />
      </Flex>
    </Layout>
  )
}
