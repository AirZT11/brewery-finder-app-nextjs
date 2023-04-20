import { Flex, Heading, Link, Text } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import NextLink from "next/link"
import { FC } from "react"
import { Rating } from "react-simple-star-rating"
import { ReviewCardProps } from "./review-card.props"

const ReviewCard: FC<ReviewCardProps> = ({ review, showBreweryName }) => {
  const { userProfile } = review
  const user = useUser()
  const createdAt = new Date(review.created_at)
  const createdAtDateTime = `${createdAt.toLocaleDateString()}`

  const breweryIdAsName = review.brewery_id.replaceAll("-", " ")
  const breweryName = review.brewery_name || breweryIdAsName
  return (
    <Flex direction="column" my="2">
      <Flex direction="column">
        {showBreweryName && <Heading size="md">{breweryName}</Heading>}
        <Flex>
          <Link
            as={NextLink}
            href={`/profile/${userProfile.username}`}
            isExternal
          >
            {userProfile.username}
          </Link>
          {user?.id === userProfile.id && (
            <Text ml="1" color="gray">
              (you)
            </Text>
          )}
        </Flex>
      </Flex>
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
