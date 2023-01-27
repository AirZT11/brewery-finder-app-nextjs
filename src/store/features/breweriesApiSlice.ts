import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
import { BreweryState } from "./brewerySlice"

export interface Location {
  lat: string
  lng: string
}

export const breweriesApi = createApi({
  reducerPath: "breweriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://api.openbrewerydb.org",
  }),
  // This is used to enable cross functionality between Next.js and RTK query
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getBreweriesByLocation: builder.query<BreweryState[], Location>({
      query: (location) => `/breweries?by_dist=${location.lat},${location.lng}`,
    }),
    searchBreweries: builder.query<BreweryState[], string>({
      query: (input) => `/breweries/search?query=${input}`,
    }),
  }),
})

export const {
  useGetBreweriesByLocationQuery,
  useSearchBreweriesQuery,
  util: { getRunningQueriesThunk },
} = breweriesApi

export const { getBreweriesByLocation, searchBreweries } =
  breweriesApi.endpoints
