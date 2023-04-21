import { Flex } from "@chakra-ui/react"
import { useSession } from "@supabase/auth-helpers-react"
import Head from "next/head"
import Account from "../components/account/account"
import Auth from "../components/auth/auth"
import Layout from "../components/layout/layout"
import useUserProfile from "../hooks/useUserProfile"
import { wrapper } from "../store/store"

const AccountPage = () => {
  const session = useSession()
  const user = useUserProfile()

  return (
    <Layout>
      <Head>
        <title>{`Account - ${user?.username || "Login or Signup"}`}</title>
        <meta name="description" content={"Your Account Page"} />
      </Head>
      <Flex w="100%" h="100%" justify="center" p="10">
        {!session ? <Auth /> : <Account session={session} />}
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
