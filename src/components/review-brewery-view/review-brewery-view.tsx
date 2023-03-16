import {
  Button,
  Flex,
  FormControl,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { FC, useEffect, useState } from "react"
import { Rating } from "react-simple-star-rating"
import {
  usePostRatingMutation,
  useUpdateRatingMutation,
} from "../../store/features/api/ratingsApiSlice"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import { ReviewBreweryViewProps } from "./review-brewery-view.props"

/** Displays a form to review a brewery */
const ReviewBreweryView: FC<ReviewBreweryViewProps> = ({ onClose }) => {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [postRating, result] = usePostRatingMutation()
  const [updateRating] = useUpdateRatingMutation()
  const user = useUser()
  const { brewery, userRating, userRatingExist } = useBreweryCardContext()
  const supabase = useSupabaseClient()
  const toast = useToast()

  useEffect(() => {
    userRatingExist && setRating(userRating[0].rating)
    userRatingExist && userRating[0].review && setReview(userRating[0].review)
  }, [userRating, userRatingExist])

  return (
    <Flex direction="column" py="4">
      {user ? (
        <>
          <Rating
            initialValue={rating}
            onClick={(val) => setRating(val)}
            transition
            size={32}
            emptyStyle={{ display: "flex" }}
            fillStyle={{ display: "-webkit-inline-box" }}
            // showTooltip
            // tooltipDefaultText="0"
            // tooltipStyle={{ fontSize: "12px" }}
          />
          <FormControl>
            <Textarea
              resize="vertical"
              my="4"
              placeholder="Write a review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </FormControl>
          <Button
            onClick={() => {
              userRatingExist
                ? updateRating({
                    rating,
                    review,
                    id: userRating[0].id,
                  })
                : postRating({
                    rating,
                    review,
                    user_id: user.id,
                    brewery_id: brewery.id,
                  })
              onClose && onClose()
            }}
          >
            Submit Rating
          </Button>
        </>
      ) : (
        <>
          <Text>Please Login or Signup to submit a review</Text>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        </>
      )}
    </Flex>
  )
}

export default ReviewBreweryView
