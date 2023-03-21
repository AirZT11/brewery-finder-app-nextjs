import { Container, Flex, Heading } from "@chakra-ui/react"
import Layout from "../components/layout/layout"
import { wrapper } from "../store/store"

const ProfilePage = () => {
  return (
    <Layout>
      <Flex direction="row" h="100%" w="100%"></Flex>
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
