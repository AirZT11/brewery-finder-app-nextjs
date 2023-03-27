import { createSelector } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { supabase } from "../../../lib/supabaseClient"

export interface UserProfileProps {
  id: string
  avatar_url?: string | null
  updated_at: Date
  username: string
  full_name?: string
}

export const profilesApi = createApi({
  reducerPath: "profilesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ktczcbuhepauvpvgteuf.supabase.co/rest/v1",
    prepareHeaders: (headers) => {
      headers.set("apiKey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      queryFn: async (username) => {
        const { data, error, status } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", username)
          .single()
        return { data }
      },
    }),
    getProfileByUserId: builder.query({
      queryFn: async (userId) => {
        const { data, error, status } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single()
        return { data }
      },
    }),
    // postRating: builder.mutation({
    //   // query: (rating) => ({
    //   //   url: `/ratings`,
    //   //   method: "POST",
    //   //   body: rating,
    //   // }),
    //   queryFn: async (rating) => {
    //     const { data } = await supabase.from("ratings").insert(rating).single()
    //     console.log("!@ postRating data", data)
    //     return { data }
    //   },
    // }),
  }),
})

export const { useGetProfileQuery, useGetProfileByUserIdQuery } = profilesApi

export const { getProfile, getProfileByUserId } = profilesApi.endpoints
