import { Flex, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Rating } from "react-simple-star-rating"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import { BreweryInfoViewProps } from "./brewery-info-view.props"

const BreweryInfoView: FC<BreweryInfoViewProps> = ({}) => {
  const { brewery, breweryRatings, averageRating } = useBreweryCardContext()
  const numOf = breweryRatings.length

  return (
    <Flex direction="column">
      {/* <Link href={`brewery/${brewery.id}`}> */}
      <Heading size="lg">{brewery.name}</Heading>
      {/* </Link> */}
      <Flex align="end">
        <Rating
          initialValue={averageRating}
          readonly
          transition
          size={24}
          emptyStyle={{ display: "flex" }}
          fillStyle={{ display: "-webkit-inline-box" }}
        />
        <Text>{`(${numOf})`}</Text>
      </Flex>
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
