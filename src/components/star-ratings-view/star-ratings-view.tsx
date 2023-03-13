import { Flex, Text } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { Rating } from "react-simple-star-rating"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import { StarRatingsViewProps } from "./star-ratings-view.props"

const StarRatingsView: FC<StarRatingsViewProps> = ({ readOnly = false }) => {
  const { breweryRatings, averageRating, rating, setRating } =
    useBreweryCardContext()

  const numOf = breweryRatings.length
  const ratings = numOf > 1 ? "reviews" : "review"

  useEffect(() => {
    setRating(averageRating)
  }, [averageRating])

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  return (
    <Flex direction="column">
      <Flex align="end">
        <Rating
          initialValue={rating}
          readonly={readOnly}
          onClick={() => {
            !readOnly && handleRating
          }}
          transition
          size={24}
          emptyStyle={{ display: "flex" }}
          fillStyle={{ display: "-webkit-inline-box" }}
        />
        <Text>{readOnly && `(${numOf})`}</Text>
      </Flex>
    </Flex>
  )
}

export default StarRatingsView
