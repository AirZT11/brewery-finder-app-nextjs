import { useState, useEffect } from "react"
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react"
import Avatar from "../avatar/avatar"
import { Button, Flex, FormLabel, Input, VStack } from "@chakra-ui/react"

interface AccountProps {
  session: Session
}

interface ProfileProps {
  username: string
  // website: string
  avatar_url?: string
}

export default function Account({ session }: AccountProps) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [avatar_url, setAvatarUrl] = useState("")
  const supabase = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    getProfile()
  }, [session]) // eslint-disable-line

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        // setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert("Error loading user data!")
      console.log("CATCH ERROR", error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, avatar_url }: ProfileProps) {
    try {
      setLoading(true)

      const updates = {
        id: user?.id,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from("profiles").upsert(updates)
      if (error) throw error
      alert("Profile updated!")
    } catch (error) {
      alert("Error updating the data!")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack spacing={4} align="start">
      <Avatar
        uid={user?.id!}
        url={avatar_url}
        size={300}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, avatar_url: url })
        }}
      />
      <Flex w="full">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="text"
          value={session.user.email}
          disabled
          bg="white"
        />
      </Flex>
      <Flex w="full">
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          bg="white"
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Flex>

      <Button
        className="button primary block"
        onClick={() => updateProfile({ username, avatar_url })}
        disabled={loading}
      >
        {loading ? "Loading ..." : "Update"}
      </Button>

      <Button className="button block" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </Button>
    </VStack>
  )
}
