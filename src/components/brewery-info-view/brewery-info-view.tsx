import { Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Rating } from "react-simple-star-rating"
import { useBreweryCardContext } from "../brewery-card/brewery-card-context"
import { BreweryInfoViewProps } from "./brewery-info-view.props"
import { GrMapLocation } from "react-icons/gr"

const BreweryInfoView: FC<BreweryInfoViewProps> = ({}) => {
  const { brewery, breweryRatings, averageRating } = useBreweryCardContext()
  const numOf = breweryRatings.length

  return (
    <Flex direction="column" w="100%">
      {/* <Link href={`brewery/${brewery.id}`}> */}
      <Heading size="md">{brewery.name}</Heading>

      {/* </Link> */}
      <Flex align="end">
        <Text>{averageRating}</Text>
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
      <Text fontSize="sm">
        {brewery.street}, {brewery.city}
      </Text>
      <Text fontSize="sm">
        {brewery.state}, {brewery.postal_code}
      </Text>
    </Flex>
  )
}

export default BreweryInfoView
