import {
  Flex,
  IconButton,
  LinkBox,
  LinkOverlay,
  useDisclosure,
} from "@chakra-ui/react"
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
import { useMap } from "react-map-gl"
import { GrMapLocation } from "react-icons/gr"
import { FaDirections } from "react-icons/fa"
import { useAppDispatch } from "../../store/hooks"
import { setSelectedBrewery } from "../../store/features/breweriesSlice"
import { useUserLocation } from "../../hooks/useUserLocation"

const BreweryCard: FC<BreweryCardProps> = ({ brewery }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const user = useUser()
  const { myMapA } = useMap()
  const { location } = useUserLocation()

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

  const dispatch = useAppDispatch()
  const handleClick = () => {
    onOpen()
    dispatch(setSelectedBrewery(brewery))
  }

  const handleLocateClick = () =>
    myMapA?.flyTo({
      center: [brewery.longitude, brewery.latitude],
      zoom: 14,
      speed: 1.2,
      curve: 1,
    })

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
        onClick={handleClick}
        p="4"
        _hover={{
          background: "background.300",
          transitionDuration: "0.1s",
          // transitionTimingFunction: "ease-in-out",
        }}
        cursor="pointer"
        justify="space-between"
      >
        <BreweryInfoView />
        <Flex direction="column" align="end" ml="2">
          <IconButton
            onClick={handleLocateClick}
            aria-label="Locate brewery on map"
            icon={<GrMapLocation />}
            variant="outline"
            disabled={brewery?.latitude === null}
            mb="2"
          />
          <LinkBox>
            <LinkOverlay
              title="Get Directions"
              href={`https://www.google.com/maps/dir/?api=1&origin=${location?.lat},${location?.lng}&destination=${brewery.latitude},${brewery.longitude}`}
              isExternal
            >
              <IconButton
                aria-label="Get Directions"
                icon={<FaDirections />}
                variant="outline"
                disabled={brewery?.latitude === null}
                mb="2"
              />
            </LinkOverlay>
          </LinkBox>
        </Flex>
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
