import { Flex, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import StarRatingsView from "../star-ratings-view/star-ratings-view"
import { BreweryInfoViewProps } from "./brewery-info-view.props"

const BreweryInfoView: FC<BreweryInfoViewProps> = ({}) => {
  const { brewery } = useBreweryCardContext()

  return (
    <Flex direction="column">
      {/* <Link href={`brewery/${brewery.id}`}> */}
      <Heading size="lg">{brewery.name}</Heading>
      {/* </Link> */}
      <StarRatingsView readOnly />
      <Text>
        {brewery.city}, {brewery.state}
      </Text>
      <Text>
        {brewery.street}, {brewery.state}, {brewery.postal_code}
      </Text>
    </Flex>
  )
}

export default BreweryInfoView
