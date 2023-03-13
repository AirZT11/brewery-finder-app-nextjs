import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { FC, useState } from "react"
import { Rating } from "react-simple-star-rating"
import { usePostRatingMutation } from "../../store/features/api/ratingsApiSlice"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import { ReviewBreweryViewProps } from "./review-brewery-view.props"

/** Displays a form to review a brewery */
const ReviewBreweryView: FC<ReviewBreweryViewProps> = () => {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [postRating, result] = usePostRatingMutation()
  const user = useUser()
  const { brewery } = useBreweryCardContext()
  const supabase = useSupabaseClient()

  return (
    <Flex direction="column">
      {user ? (
        <>
          <Rating
            initialValue={rating}
            onClick={(val) => setRating(val)}
            transition
            size={32}
            emptyStyle={{ display: "flex" }}
            fillStyle={{ display: "-webkit-inline-box" }}
          />
          <FormControl>
            <Input
              my="4"
              placeholder="Write a review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </FormControl>
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
