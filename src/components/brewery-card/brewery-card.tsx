import { Flex, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
import { FC, useState } from "react"
import { useSelector } from "react-redux"
import {
  RatingProps,
  RatingsState,
  selectRating,
} from "../../store/features/ratingsSlice"
import StarRatingsView from "../star-ratings-view/star-ratings-view"
import BreweryCardContext from "./brewery-card-context"
import { BreweryCardProps } from "./brewery-card.props"

const BreweryCard: FC<BreweryCardProps> = ({ brewery }) => {
  const [rating, setRating] = useState(0)
  const breweryRatings = useSelector((state: { ratings: RatingsState }) =>
    selectRating(state, brewery.id)
  )

  // Get average rating
  // TODO: Move this to the ratingsSlice or into SQL database function
  const getAverageRating = (ratings: RatingProps[]) => {
    const ratingsArr = ratings.map((r) => r.rating)
    const sum = ratingsArr.reduce((a, b) => a + b, 0)
    const average = sum > 0 ? sum / ratings.length : 0
    return average
  }
  const averageRating = getAverageRating(breweryRatings)

  return (
    <BreweryCardContext.Provider
      value={{ brewery, breweryRatings, averageRating, rating, setRating }}
    >
      <Flex my="4" direction="column">
        <Link href={`brewery/${brewery.id}`}>
          <Heading size="lg">{brewery.name}</Heading>
        </Link>

        <Text>
          {brewery.city}, {brewery.state}
        </Text>
        <StarRatingsView enableReviewPopup />
      </Flex>
    </BreweryCardContext.Provider>
  )
}

export default BreweryCard
