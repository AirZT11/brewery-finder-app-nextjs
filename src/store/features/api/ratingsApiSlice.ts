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
          .select("*, userProfile:profiles(*)")
          .in("brewery_id", breweryIds)
        console.log(data)
        return { data }
      },
    }),
    /** TODO: Used to check if user has already reviewed a specific brewery */
    // getUserBreweryRating: builder.query({
    //   queryFn: async (breweryId) => {
    //     const { data } = await supabase
    //       .from("ratings")
    //       .select("*")
    //       .eq("brewery_id", breweryId)
    //     // .eq("user_id", userId)
    //     console.log("!@ user rated brewery", data)
    //     return { data }
    //   },
    // }),
    postRating: builder.mutation({
      // query: (rating) => ({
      //   url: `/ratings`,
      //   method: "POST",
      //   body: rating,
      // }),
      queryFn: async (rating) => {
        const { data } = await supabase.from("ratings").insert(rating).single()
        return { data }
      },
    }),
    updateRating: builder.mutation({
      // query: (rating) => ({
      //   url: `/ratings`,
      //   method: "POST",
      //   body: rating,
      // }),
      queryFn: async (updatedRating) => {
        const { data } = await supabase
          .from("ratings")
          .update(updatedRating)
          .eq("id", updatedRating.id)
        return { data }
      },
    }),
  }),
})

export const {
  useGetRatingsQuery,
  usePostRatingMutation,
  useUpdateRatingMutation,
} = ratingsApi

export const { getRatings, postRating, updateRating } = ratingsApi.endpoints
