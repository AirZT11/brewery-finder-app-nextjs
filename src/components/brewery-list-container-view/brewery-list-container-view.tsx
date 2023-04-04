import { Box, Fade, Flex } from "@chakra-ui/react"
import { FC } from "react"
import { useAppSelector } from "../../store/hooks"
import BreweryListView from "../brewery-list-view/brewery-list-view"
import SearchView from "../search-view/search-view"
import { BreweryListContainerViewProps } from "./brewery-list-container-view.props"
import { motion } from "framer-motion"

const BreweryListContainerView: FC<BreweryListContainerViewProps> = () => {
  const breweries = useAppSelector((state) => state.breweries.breweriesList)

  return (
    <Fade
      in={true}
      style={{ height: breweries.length > 0 ? "100%" : "inherit" }}
    >
      <Flex
        opacity=".93"
        direction="column"
        background="background.100"
        h={breweries.length > 0 ? "100%" : "inherit"}
        overflow="scroll"
        maxW={{ base: "full", md: "400px" }}
        borderRadius="8"
        boxShadow={"md"}
      >
        {/* <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ speed: 1 }}
      > */}
        <Flex
          position="sticky"
          top="0"
          bg="background.300"
          zIndex="100"
          px="4"
          pb={2}
          pt={{ base: 3, md: 2 }}
          boxShadow="lg"
        >
          <SearchView />
        </Flex>
        {breweries && <BreweryListView />}
        {/* </motion.div> */}
      </Flex>
    </Fade>
  )
}

export default BreweryListContainerView
