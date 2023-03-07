import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { Rating } from "react-simple-star-rating"
import { usePostRatingMutation } from "../../store/features/api/ratingsApiSlice"
import {
  RatingProps,
  RatingsState,
  selectRating,
} from "../../store/features/ratingsSlice"
import { BreweryCardProps } from "./brewery-card.props"

const BreweryCard: FC<BreweryCardProps> = ({ brewery, user }) => {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [postRating, result] = usePostRatingMutation()
  const breweryRatings = useSelector((state: { ratings: RatingsState }) =>
    selectRating(state, brewery.id)
  )

  const numOf = breweryRatings.length
  const ratings = numOf > 1 ? "ratings" : "rating"

  // Get average rating
  // TODO: Move this to the ratingsSlice
  const averageRating = (ratings: RatingProps[]) => {
    const ratingsArr = ratings.map((r) => r.rating)
    const sum = ratingsArr.reduce((a, b) => a + b, 0)
    const average = sum > 0 ? sum / ratings.length : 0
    return average
  }

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  return (
    <Flex my="4" direction="column">
      <Link href={`brewery/${brewery.id}`}>
        <Heading size="lg">{brewery.name}</Heading>
      </Link>

      <Text>
        {brewery.city}, {brewery.state}
      </Text>

      {/* Star Rating Section */}
      <Flex direction="column">
        <Rating
          initialValue={averageRating(breweryRatings)}
          onClick={handleRating}
          transition
          emptyStyle={{ display: "flex" }}
          fillStyle={{ display: "-webkit-inline-box" }}
          // allowFraction
          // onPointerEnter={onPointerEnter}
          // onPointerLeave={onPointerLeave}
          // onPointerMove={onPointerMove}
        />
        <Text>
          {numOf} {ratings}
        </Text>
        <Input
          placeholder="Write a review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        {/* {user && (
          <Button
            onClick={() =>
              postRating({
                rating,
                review,
                user_id: user.id,
                brewery_id: brewery.id,
              })
            }
          >
            Submit Rating
          </Button>
        )} */}
      </Flex>
    </Flex>
  )
}

export default BreweryCard
