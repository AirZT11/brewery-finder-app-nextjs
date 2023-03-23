import { Container, Flex, Heading, Spinner, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Layout from "../../components/layout/layout"
import ReviewListView from "../../components/review-list-view/review-list-view"
import { useGetProfileQuery } from "../../store/features/api/profilesApiSlice"
import { useGetRatingsByUserIdQuery } from "../../store/features/api/ratingsApiSlice"
import { wrapper } from "../../store/store"

const ProfilePage = () => {
  // Extract the username from the URL
  const router = useRouter()
  const { username } = router.query

  const { data: user } = useGetProfileQuery(username)
  const userId = user?.id

  const { data: breweryRatings } = useGetRatingsByUserIdQuery(userId, {
    skip: !userId,
  })

  // if userId does not exist, redirect to 404 page
  if (!userId) {
    // return <Redirect to="/404" />
    return (
      <Flex justify={"center"}>
        <Spinner />
      </Flex>
    )
  }

  return (
    <Layout>
      <Flex direction="column" h="100%" w="100%" align="center">
        <Heading>{username}</Heading>
        {breweryRatings && <ReviewListView breweryRatings={breweryRatings} />}
      </Flex>
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
