import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"

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
  longitude?: string
  latitude?: string
  phone?: string
  website_url?: string
  updated_at?: string
  created_at?: string
}

/**
 * Default state object with initial values.
 */
const initialState: BreweryState = {
  id: "",
  name: "",
  brewery_type: "",
  street: "",
  address_2: "",
  address_3: "",
  city: "",
  state: "",
  county_province: "",
  postal_code: "",
  country: "",
  longitude: "",
  latitude: "",
  phone: "",
  website_url: "",
  updated_at: "",
  created_at: "",
}

/**
 * Create a slice as a reducer containing actions.
 */
export const brewerySlice = createSlice({
  name: "brewery",
  initialState,
  reducers: {},
})

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { brewery: BreweryState }) => state.brewery

// Exports all actions
export const {} = brewerySlice.actions

export default brewerySlice.reducer
