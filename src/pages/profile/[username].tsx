import { Flex } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../../components/layout/layout"
import Profile from "../../components/profile/profile"
import { wrapper } from "../../store/store"

/**
 * Displays a user's profile page
 */
const ProfilePage = () => {
  // Extract the username from the URL
  const router = useRouter()
  const { username } = router.query

  // if userId does not exist, redirect to 404 page
  // if (!userId) {
  //   // return <Redirect to="/404" />
  //   return (
  //     <Flex justify={"center"}>
  //       <Spinner />
  //     </Flex>
  //   )
  // }

  return (
    <Layout>
      <Head>
        <title>{`${username}'s Profile`}</title>
        <meta name="description" content={`${username}'s Profile Page`} />
      </Head>
      {/* <Flex direction="column" h="100%" w="100%" align="center"> */}
      {username && <Profile username={username} />}
      {/* </Flex> */}
    </Layout>
  )
}

export default ProfilePage

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    return {
      props: {},
    }
  }
)
