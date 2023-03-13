import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import ReviewCard from "../review-card/review-card"
import { ReviewListViewProps } from "./review-list-view.props"

const ReviewListView: FC<ReviewListViewProps> = () => {
  const { breweryRatings } = useBreweryCardContext()
  return (
    <Flex direction="column">
      {breweryRatings && breweryRatings.length ? (
        breweryRatings.map((rating) => (
          <ReviewCard key={rating.id} review={rating} />
        ))
      ) : (
        <Text mt="4">No Reviews. Be the first one to review this brewery!</Text>
      )}
    </Flex>
  )
}

export default ReviewListView
