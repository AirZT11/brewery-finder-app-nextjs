import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import { ReviewCardProps } from "./review-card.props"

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  return (
    <Flex direction="column" my="2">
      <Text>User: {review.user_id}</Text>
      <Text>Rating: {review.rating}</Text>
      {/* TODO ReviewCard: Date time format */}
      <Text>{review.created_at}</Text>
      <Text>Review: {review.review}</Text>
      {/* TODO ReviewCard: IMAGES */}
    </Flex>
  )
}

export default ReviewCard
