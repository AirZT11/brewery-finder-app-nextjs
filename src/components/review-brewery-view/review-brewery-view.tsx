import { Button, Flex, Input } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { FC, useState } from "react"
import { usePostRatingMutation } from "../../store/features/api/ratingsApiSlice"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import { ReviewBreweryViewProps } from "./review-brewery-view.props"

/** Displays a form to review a brewery */
const ReviewBreweryView: FC<ReviewBreweryViewProps> = () => {
  const [review, setReview] = useState("")
  const [postRating, result] = usePostRatingMutation()
  const user = useUser()
  const { brewery, rating, setRating } = useBreweryCardContext()
  return (
    <Flex direction="column">
      <Input
        placeholder="Write a review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      {user && (
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
      )}
    </Flex>
  )
}

export default ReviewBreweryView
