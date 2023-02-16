import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import Account from "../components/account/account"
import NavBarView from "../components/nav-bar-view/nav-bar-view"
import { Flex } from "@chakra-ui/react"
const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Flex direction="column">
      <NavBarView />
      <h1>HOMEPAGE</h1>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        <Account session={session} />
      )}
    </Flex>
  )
}

export default Home
