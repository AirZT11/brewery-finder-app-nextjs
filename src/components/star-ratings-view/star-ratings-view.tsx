import { Flex, Text, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { Rating } from "react-simple-star-rating"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import ReviewPopupView from "../review-popup-view/review-popup-view"
import { StarRatingsViewProps } from "./star-ratings-view.props"

const StarRatingsView: FC<StarRatingsViewProps> = ({
  enableReviewPopup = false,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { breweryRatings, averageRating, rating, setRating } =
    useBreweryCardContext()

  const numOf = breweryRatings.length
  const ratings = numOf > 1 ? "ratings" : "rating"

  useEffect(() => {
    console.log("!@ UseEFFECT")
    setRating(averageRating)
  }, [averageRating])

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const onCloseComplete = () => {
    console.log("!@ onCloseComplete called")
    console.log("!@ averageRating", averageRating)
    setRating(averageRating)
  }

  return (
    <Flex direction="column">
      <Rating
        initialValue={rating}
        onClick={() => {
          handleRating
          enableReviewPopup && onOpen()
        }}
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

      {enableReviewPopup && (
        <ReviewPopupView
          {...{
            onOpen,
            onClose,
            isOpen,
            onCloseComplete,
          }}
        />
      )}
    </Flex>
  )
}

export default StarRatingsView
