import { Flex, Text } from "@chakra-ui/react"
import Link from "next/link"
import { FC } from "react"
import { BreweryCardProps } from "./brewery-card.props"

const BreweryCard: FC<BreweryCardProps> = ({ brewery }) => {
  return (
    <Flex my="4" direction="column">
      <Link href={`brewery/${brewery.id}`}>
        <Text>{`${brewery.name} Info`}</Text>
        <Text>{brewery.name}</Text>
      </Link>

      <p className="brew-location">
        {brewery.city}, {brewery.state}
      </p>
    </Flex>
  )
}

export default BreweryCard
