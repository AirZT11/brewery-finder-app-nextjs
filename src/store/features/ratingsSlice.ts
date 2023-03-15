import { createSlice } from "@reduxjs/toolkit"
import { UserProfileProps } from "./api/profilesApiSlice"
import { getRatings, postRating } from "./api/ratingsApiSlice"

export interface RatingProps {
  id: string
  created_at: Date
  rating: number
  review?: string
  user_id: string
  brewery_id: string
  brewery_name?: string
  userProfile: UserProfileProps
}

export interface RatingsState {
  ratingsList: RatingProps[]
}

/**
 * Default state object with initial values.
 */
const initialState: RatingsState = {
  ratingsList: [],
}

/**
 * Create a slice as a reducer containing actions.
 */
export const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(getRatings.matchFulfilled, (state, action) => {
      state.ratingsList = action.payload
    })
    // builder.addMatcher(postRating.matchFulfilled, (state, action) => {
    //   state.ratingsList = action.payload
    // })
  },
})

// A small helper of user state for `useSelector` function.
// export const getRatingState = (state: { rating: RatingProps }) => state.rating

const { actions, reducer } = ratingsSlice

export const selectRating = (
  state: { ratings: RatingsState },
  breweryId: string
) => {
  return state.ratings.ratingsList.filter((r) => r.brewery_id === breweryId)
}

// Exports all actions
export const {} = actions

export default reducer
