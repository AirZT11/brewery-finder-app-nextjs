import {
  Button,
  Flex,
  FormControl,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { FC, useEffect, useState } from "react"
import { Rating } from "react-simple-star-rating"
import {
  useDeleteRatingMutation,
  usePostRatingMutation,
  useUpdateRatingMutation,
} from "../../store/features/api/ratingsApiSlice"
import { AlertView } from "../alert-view/alert-view"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import { ReviewBreweryViewProps } from "./review-brewery-view.props"

/** Displays a form to review a brewery */
const ReviewBreweryView: FC<ReviewBreweryViewProps> = ({ onClose }) => {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const {
    isOpen: alertIsOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure()

  const { brewery, userRating, userRatingExist } = useBreweryCardContext()
  const [postRating, postResult] = usePostRatingMutation()
  const [updateRating, updateResult] = useUpdateRatingMutation()
  const [deleteRating, deleteResult] = useDeleteRatingMutation()

  const user = useUser()
  const supabase = useSupabaseClient()
  const toast = useToast()

  const noRating = rating === 0

  // If local user rating already exists, set the initial values to their rating/review
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
          />

          <Textarea
            resize="vertical"
            my="4"
            placeholder="Write a review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <Button
            isDisabled={noRating}
            onClick={() => {
              userRatingExist
                ? updateRating({
                    rating,
                    review,
                    id: userRating[0].id,
                  }).then(() =>
                    toast({
                      title: "Rating updated",
                      description: `Your rating for ${brewery.name} has been updated!`,
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    })
                  )
                : postRating({
                    rating,
                    review,
                    user_id: user.id,
                    brewery_id: brewery.id,
                    brewery_name: brewery.name,
                  }).then(() =>
                    toast({
                      title: "Rating posted",
                      description: `Your rating for ${brewery.name} has been posted!`,
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    })
                  )
              onClose && onClose()
            }}
          >
            Submit Rating
          </Button>
          {userRatingExist && (
            <Button onClick={openAlert} colorScheme="red">
              Delete Rating
            </Button>
          )}
          <AlertView
            header={"Delete your rating?"}
            body={"Are you sure you want to delete your rating?"}
            alertIsOpen={alertIsOpen}
            closeAlert={closeAlert}
            onSubmit={() =>
              deleteRating(userRating[0].id).then(() =>
                toast({
                  title: "Rating deleted",
                  description: `Your rating for ${brewery.name} has been deleted!`,
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                })
              )
            }
            closeModal={onClose}
          />
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
