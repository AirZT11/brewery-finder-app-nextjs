import {
  Box,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { FC } from "react"
import { useGetProfileQuery } from "../../store/features/api/profilesApiSlice"
import { useGetRatingsByUserIdQuery } from "../../store/features/api/ratingsApiSlice"
import UserAvatar from "../user-avatar/user-avatar"
import ReviewListView from "../review-list-view/review-list-view"
import { ProfileProps } from "./profile.props"

const Profile: FC<ProfileProps> = ({ username }) => {
  const { data: user } = useGetProfileQuery(username)
  const userId = user?.id

  const { data: breweryRatings } = useGetRatingsByUserIdQuery(userId, {
    skip: !userId,
  })

  return (
    // <Container p="8" h="full">
    <Flex direction="column" align="center" p="8" h="100%" overflow="hidden">
      {user?.avatar_url && (
        <UserAvatar uid={user?.id!} url={user.avatar_url} size={150} />
      )}
      <Heading my="4">{username}</Heading>

      {/* <Text>Reviews:</Text> */}
      <Flex
        overflow="auto"
        borderColor="background.300"
        borderWidth="2px"
        bg="background.100"
        p="4"
        borderRadius="8"
      >
        {breweryRatings && (
          <ReviewListView breweryRatings={breweryRatings} isProfileView />
        )}
      </Flex>
    </Flex>
    // </Container>
  )
}

export default Profile
