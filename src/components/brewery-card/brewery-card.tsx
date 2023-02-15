import { Flex, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
import { FC } from "react"
import { BreweryCardProps } from "./brewery-card.props"

const BreweryCard: FC<BreweryCardProps> = ({ brewery }) => {
  return (
    <Flex my="4" direction="column">
      <Link href={`brewery/${brewery.id}`}>
        <Heading size="lg">{brewery.name}</Heading>
      </Link>

      <p className="brew-location">
        {brewery.city}, {brewery.state}
      </p>
    </Flex>
  )
}

export default BreweryCard
