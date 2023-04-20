import { Flex } from "@chakra-ui/react"
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import Head from "next/head"
import Account from "../components/account/account"
import Layout from "../components/layout/layout"
import useUserProfile from "../hooks/useUserProfile"
import { wrapper } from "../store/store"

const AccountPage = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUserProfile()

  return (
    <Layout>
      <Head>
        <title>{`Your Account - ${user?.username}`}</title>
        <meta name="description" content={"Your Account Page"} />
      </Head>
      <Flex w="100%" h="100%" justify="center" p="10">
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: { background: "black", color: "white" },
              },
            }}
            // theme="dark"
          />
        ) : (
          <Account session={session} />
        )}
      </Flex>
    </Layout>
  )
}

export default AccountPage

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    return {
      props: {},
    }
  }
)
