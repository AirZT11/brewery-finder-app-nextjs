import { Flex, Heading } from "@chakra-ui/react"
import { FC } from "react"
import NavBarView from "../nav-bar-view/nav-bar-view"
import SearchView from "../search-view/search-view"
import { HomepageViewProps } from "./homepage-view.props"

export const HomepageView: FC<HomepageViewProps> = () => {
  const onSubmit = () => console.log("onSubmit")
  return (
    <Flex direction="column" width="100vw" height="100vh">
      <NavBarView />
      <Flex direction="column" h="full" justify="center" align="center">
        <Flex direction="column" mb="8" align="center">
          <Heading>Welcome To</Heading>
          <Heading>The Brewery Finder</Heading>
        </Flex>
        <SearchView navigateToMapOnSubmit />
      </Flex>
    </Flex>
  )
}
