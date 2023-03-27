import { RatingProps } from "../../store/features/ratingsSlice"

export interface ReviewCardProps {
  /** The ratings object */
  review: RatingProps
  /** Display the brewery name */
  showBreweryName?: boolean
}
