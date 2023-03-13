import { createSelector } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BreweryState } from "../breweriesSlice"
import { supabase } from "../../../lib/supabaseClient"

interface RatingState {
  id: number
  created_at: string
  rating: number
  review: string
  userId: string
  brewery_id: string
}

interface BrewRatingsState {
  brewery_id: string
  ratings: RatingState[]
}

export const ratingsApi = createApi({
  reducerPath: "ratingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ktczcbuhepauvpvgteuf.supabase.co/rest/v1",
    prepareHeaders: (headers) => {
      headers.set("apiKey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      // headers.set(
      //   "Authorization",
      //   `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
      // )
    },
  }),
  endpoints: (builder) => ({
    getRatings: builder.query({
      queryFn: async (breweryIds) => {
        const { data } = await supabase
          .from("ratings")
          .select()
          .in("brewery_id", breweryIds)
        return { data }
      },
    }),
    postRating: builder.mutation({
      // query: (rating) => ({
      //   url: `/ratings`,
      //   method: "POST",
      //   body: rating,
      // }),
      queryFn: async (rating) => {
        const { data } = await supabase.from("ratings").insert(rating).single()
        console.log("!@ postRating data", data)
        return { data }
      },
    }),
  }),
})

export const { useGetRatingsQuery, usePostRatingMutation } = ratingsApi

export const { getRatings, postRating } = ratingsApi.endpoints
