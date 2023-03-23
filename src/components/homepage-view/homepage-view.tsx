import { Flex, Heading } from "@chakra-ui/react"
import { FC } from "react"
import Layout from "../layout/layout"
import SearchView from "../search-view/search-view"
import { HomepageViewProps } from "./homepage-view.props"

export const HomepageView: FC<HomepageViewProps> = () => {
  return (
    <Layout>
      <Flex direction="column" h="full" justify="center" align="center" p="4">
        <Flex direction="column" mb="8" align="center">
          <Heading>Welcome To</Heading>
          <Heading>The Brewery Finder</Heading>
        </Flex>
        <SearchView navigateToMapOnSubmit />
      </Flex>
    </Layout>
  )
}
