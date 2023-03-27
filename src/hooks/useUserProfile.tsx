import { useUser } from "@supabase/auth-helpers-react"
import { useGetProfileByUserIdQuery } from "../store/features/api/profilesApiSlice"
import { useGetRatingsByUserIdQuery } from "../store/features/api/ratingsApiSlice"

/** Returns the profile of the given userID or local user */
const useUserProfile = (userId?: string) => {
  const user = useUser()
  const id = userId || user?.id
  const { data: profile } = useGetProfileByUserIdQuery(id, {
    skip: !id,
  })

  return profile
}

export default useUserProfile
