import { createContext, Dispatch, SetStateAction, useContext } from "react"
import { BreweryState } from "../../store/features/breweriesSlice"
import { RatingProps } from "../../store/features/ratingsSlice"

const BreweryCardContext = createContext<{
  brewery: BreweryState
  breweryRatings: RatingProps[]
  userRating: RatingProps[]
  userRatingExist: boolean
  averageRating: number
} | null>(null)

export function useBreweryCardContext() {
  const context = useContext(BreweryCardContext)
  if (!context) {
    throw new Error(
      "BreweryCard.* component must be rendered as child of BreweryCard component"
    )
  }
  return context
}

export default BreweryCardContext
