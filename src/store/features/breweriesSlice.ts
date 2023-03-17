import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  getBreweriesByLocation,
  getBrewsByCity,
  getBrewsByName,
  getBrewsByState,
  getBrewsByType,
  getBrewsByZip,
} from "./api/breweriesApiSlice"

export interface Location {
  lat: number
  lng: number
}
export interface BreweryState {
  id: string
  name: string
  brewery_type?: string
  street?: string
  address_2?: string | null
  address_3?: string | null
  city?: string
  state: string
  county_province?: string | null
  postal_code?: string
  country: string
  longitude: number
  latitude: number
  phone?: string
  website_url?: string
  updated_at?: string
  created_at?: string
}

export interface BreweriesState {
  breweriesList: BreweryState[]
  selectedBrewery: BreweryState | null
}

/**
 * Default state object with initial values.
 */
const initialState: BreweriesState = {
  breweriesList: [],
  selectedBrewery: null,
}

/**
 * Create a slice as a reducer containing actions.
 */
export const breweriesSlice = createSlice({
  name: "breweries",
  initialState,
  reducers: {
    setSelectedBrewery(state, action: PayloadAction<BreweryState>) {
      console.log("!@ Dispatch setSelectedBrewery", state, action)
      state.selectedBrewery = action.payload
      // console.log("!@ selectedBrewery state", state.selectedBrewery)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      getBreweriesByLocation.matchFulfilled,
      (state, action) => {
        state.breweriesList = action.payload
      }
    )
    builder.addMatcher(getBrewsByName.matchFulfilled, (state, action) => {
      state.breweriesList = action.payload
    })
    builder.addMatcher(getBrewsByZip.matchFulfilled, (state, action) => {
      state.breweriesList = action.payload
    })
    builder.addMatcher(getBrewsByType.matchFulfilled, (state, action) => {
      state.breweriesList = action.payload
    })
    builder.addMatcher(getBrewsByCity.matchFulfilled, (state, action) => {
      state.breweriesList = action.payload
    })
    builder.addMatcher(getBrewsByState.matchFulfilled, (state, action) => {
      state.breweriesList = action.payload
    })
  },
})

// A small helper of user state for `useSelector` function.
export const getBreweryState = (state: { brewery: BreweryState }) =>
  state.brewery

// Exports all actions
export const { setSelectedBrewery } = breweriesSlice.actions

export default breweriesSlice.reducer
