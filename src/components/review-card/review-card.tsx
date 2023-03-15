import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Rating } from "react-simple-star-rating"
import { ReviewCardProps } from "./review-card.props"

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const { userProfile } = review
  const createdAt = new Date(review.created_at)
  const createdAtDateTime = `${createdAt.toLocaleDateString()}`
  return (
    <Flex direction="column" my="2">
      <Text>{userProfile.username}</Text>
      <Flex align="end">
        <Rating
          initialValue={review.rating}
          readonly
          size={18}
          emptyStyle={{ display: "flex" }}
          fillStyle={{ display: "-webkit-inline-box" }}
        />
        <Text fontSize={"sm"} color="gray" mx="1">
          {createdAtDateTime}
        </Text>
      </Flex>
      <Text fontSize="sm">{review.review}</Text>
      {/* TODO ReviewCard: IMAGES */}
    </Flex>
  )
}

export default ReviewCard
