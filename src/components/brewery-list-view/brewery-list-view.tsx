import { Flex } from "@chakra-ui/react"
import { FC } from "react"
import { useGetRatingsQuery } from "../../store/features/api/ratingsApiSlice"
import { useAppSelector } from "../../store/hooks"
import BreweryCard from "../brewery-card/brewery-card"
import { BreweryListViewProps } from "./brewery-list-view.props"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: 300 },
  show: { opacity: 1, x: 0 },
}

const BreweryListView: FC<BreweryListViewProps> = ({}) => {
  // TODO: Move this logic into the ratings slice
  const breweries = useAppSelector((state) => state.breweries.breweriesList)
  const breweryIds = breweries.map((brew) => brew.id)
  useGetRatingsQuery(breweryIds, {
    skip: breweryIds.length < 1,
  })

  return (
    <Flex direction="column">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* TODO: If no breweries are returned from query, display prompt */}
        {/* {!breweries.length && <Heading>No breweries found</Heading>} */}
        {breweries &&
          breweries.map((brewery) => (
            <motion.div key={brewery.id} variants={item}>
              <BreweryCard key={brewery.id} brewery={brewery} />
            </motion.div>
          ))}
      </motion.div>
    </Flex>
  )
}

export default BreweryListView
