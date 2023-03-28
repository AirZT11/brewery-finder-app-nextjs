import {
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { FC } from "react"
import { useGetProfileQuery } from "../../store/features/api/profilesApiSlice"
import { useGetRatingsByUserIdQuery } from "../../store/features/api/ratingsApiSlice"
import Avatar from "../avatar/avatar"
import ReviewListView from "../review-list-view/review-list-view"
import { ProfileProps } from "./profile.props"

const Profile: FC<ProfileProps> = ({ username }) => {
  const { data: user } = useGetProfileQuery(username)
  const userId = user?.id

  const { data: breweryRatings } = useGetRatingsByUserIdQuery(userId, {
    skip: !userId,
  })

  return (
    <Container p="8" h="full">
      <Flex direction="column" align="center">
        {user?.avatar_url && (
          <Avatar uid={user?.id!} url={user.avatar_url} size={200} />
        )}
        <Heading my="4">{username}</Heading>
        <Tabs
          /* isFitted */ variant="unstyled"
          overflow="auto"
          maxHeight="1000px"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <TabList mb="1em">
            <Tab>Reviews</Tab>
            {/* <Tab>Saved</Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              {breweryRatings && (
                <ReviewListView breweryRatings={breweryRatings} isProfileView />
              )}
            </TabPanel>
            {/* <TabPanel>
              <p>two!</p>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  )
}

export default Profile
