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

  console.log(breweryRatings)

  return (
    <Container>
      <Flex direction="column" align="center">
        <Avatar uid={user?.id!} url={user.avatar_url} size={200} />
        <Heading my="4">{username}</Heading>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Reviews</Tab>
            <Tab>Saved</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {breweryRatings && (
                <ReviewListView breweryRatings={breweryRatings} isProfileView />
              )}
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  )
}

export default Profile
