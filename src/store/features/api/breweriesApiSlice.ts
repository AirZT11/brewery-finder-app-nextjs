import { createSelector } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BreweryState } from "../breweriesSlice"

export interface Location {
  lat: number
  lng: number
}

export const breweriesApi = createApi({
  reducerPath: "breweriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://api.openbrewerydb.org",
  }),
  // tagTypes: ["Breweries"],
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
        // providesTags: ["Breweries"],
      }
    ),
    getBrewsByName: builder.query<BreweryState[], string>({
      query: (input) => `/breweries/search?query=${input}`,
    }),
    getBrewsByZip: builder.query<BreweryState[], string>({
      query: (input) => `/breweries?by_postal=${input}`,
    }),
    getBrewsByType: builder.query<BreweryState[], string>({
      query: (input) => `/breweries?by_type=${input}`,
    }),
    getBrewsByCity: builder.query<BreweryState[], string>({
      query: (input) => `/breweries?by_city=${input}`,
    }),
    getBrewsByState: builder.query<BreweryState[], string>({
      query: (input) => `/breweries?by_state=${input}`,
    }),
  }),
})

export const {
  useGetBreweriesByLocationQuery,
  useGetBrewsByNameQuery,
  useGetBrewsByZipQuery,
  useGetBrewsByTypeQuery,
  useGetBrewsByCityQuery,
  useGetBrewsByStateQuery,
  // util: { getRunningQueriesThunk },
} = breweriesApi

export const {
  getBreweriesByLocation,
  getBrewsByName,
  getBrewsByCity,
  getBrewsByState,
  getBrewsByType,
  getBrewsByZip,
} = breweriesApi.endpoints
