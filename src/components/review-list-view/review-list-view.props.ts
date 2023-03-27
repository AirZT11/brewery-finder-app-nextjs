import { RatingProps } from "../../store/features/ratingsSlice"

export interface ReviewListViewProps {
  breweryRatings: RatingProps[]
  /** If in profile page, display the brewery cards differently */
  isProfileView?: boolean
}
