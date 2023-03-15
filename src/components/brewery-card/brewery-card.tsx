import { Flex, useDisclosure } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useSelector } from "react-redux"
import {
  RatingProps,
  RatingsState,
  selectRating,
} from "../../store/features/ratingsSlice"
import BreweryInfoView from "../brewery-info-view/brewery-info-view"
import BreweryInfoPopupView from "../brewery-info-popup-view/brewery-info-popup-view"
import BreweryCardContext from "./brewery-card-context"
import { BreweryCardProps } from "./brewery-card.props"
import { useUser } from "@supabase/auth-helpers-react"

const BreweryCard: FC<BreweryCardProps> = ({ brewery }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const user = useUser()

  const breweryRatings = useSelector((state: { ratings: RatingsState }) =>
    selectRating(state, brewery.id)
  )

  // Get average rating
  // TODO: Move this to the ratingsSlice or into SQL database function
  const getAverageRating = (ratings: RatingProps[]) => {
    const ratingsArr = ratings.map((r) => r.rating)
    const sum = ratingsArr.reduce((a, b) => a + b, 0)
    const average = sum > 0 ? sum / ratings.length : 0
    return average
  }
  const averageRating = getAverageRating(breweryRatings)

  /**
   * TODO: This logic should be different and should live somewhere else
   * Determines whether user has already reviewed this brewery
   */
  const userRating = breweryRatings.filter(
    (brewery) => brewery.user_id === user?.id
  )
  const userRatingExist = !!userRating.length

  return (
    <BreweryCardContext.Provider
      value={{
        brewery,
        breweryRatings,
        userRating,
        userRatingExist,
        averageRating,
      }}
    >
      <Flex
        onClick={onOpen}
        py="4"
        _hover={{
          background: "background.300",
          transitionDuration: "0.1s",
          transitionTimingFunction: "ease-in-out",
        }}
        cursor="pointer"
      >
        <BreweryInfoView />

        <BreweryInfoPopupView
          {...{
            onOpen,
            onClose,
            isOpen,
            // onCloseComplete,
          }}
        />
      </Flex>
    </BreweryCardContext.Provider>
  )
}

export default BreweryCard
