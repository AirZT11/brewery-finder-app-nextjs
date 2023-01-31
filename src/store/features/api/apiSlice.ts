import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
import { BreweryState } from "../breweriesSlice"

export interface Location {
  lat: number
  lng: number
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://api.openbrewerydb.org",
  }),
  tagTypes: ["Breweries"],
  // This is used to enable cross functionality between Next.js and RTK query
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath]
  //   }
  // },
  endpoints: (builder) => ({
    getBreweriesByLocation: builder.query<BreweryState[], Location | undefined>(
      {
        query: (location) =>
          `/breweries?by_dist=${location?.lat},${location?.lng}`,
        providesTags: ["Breweries"],
      }
    ),
    searchBreweries: builder.query<BreweryState[], string>({
      query: (input) => `/breweries/search?query=${input}`,
    }),
  }),
})

export const {
  useGetBreweriesByLocationQuery,
  useSearchBreweriesQuery,
  // util: { getRunningQueriesThunk },
} = apiSlice

export const { getBreweriesByLocation, searchBreweries } = apiSlice.endpoints
