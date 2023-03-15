import { createSelector } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
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
    },
  }),
  tagTypes: ["Ratings"],
  endpoints: (builder) => ({
    getRatings: builder.query<RatingState[], string[]>({
      queryFn: async (breweryIds) => {
        console.log("!@ getRatings called", breweryIds)
        const { data } = await supabase
          .from("ratings")
          .select("*, userProfile:profiles(*)")
          .in("brewery_id", breweryIds)
        return { data }
      },
      providesTags: ["Ratings"],
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
      invalidatesTags: ["Ratings"],
    }),
    updateRating: builder.mutation({
      queryFn: async (updatedRating) => {
        const { data } = await supabase
          .from("ratings")
          .update(updatedRating)
          .eq("id", updatedRating.id)
        return { data }
      },
      invalidatesTags: ["Ratings"],
    }),
    deleteRating: builder.mutation({
      queryFn: async (ratingId) => {
        const { data } = await supabase
          .from("ratings")
          .delete()
          .eq("id", ratingId)
        return { data }
      },
      invalidatesTags: ["Ratings"],
    }),
  }),
})

export const {
  useGetRatingsQuery,
  usePostRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
} = ratingsApi

export const { getRatings, postRating, updateRating, deleteRating } =
  ratingsApi.endpoints
