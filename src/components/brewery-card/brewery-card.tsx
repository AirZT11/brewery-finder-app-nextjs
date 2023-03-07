import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { FC } from "react"
import { usePostRatingMutation } from "../../store/features/api/ratingsApiSlice"
import { BreweryCardProps } from "./brewery-card.props"

const BreweryCard: FC<BreweryCardProps> = ({ brewery, user }) => {
  const [postRating, result] = usePostRatingMutation()
  console.log("!@ result", result)
  console.log("!@ user.id", user)
  return (
    <Flex my="4" direction="column">
      <Link href={`brewery/${brewery.id}`}>
        <Heading size="lg">{brewery.name}</Heading>
      </Link>

      <Text>
        {brewery.city}, {brewery.state}
      </Text>
      {user && (
        <Button
          onClick={() =>
            postRating({
              rating: 5,
              review: "Good stuff!",
              user_id: user.id,
              brewery_id: brewery.id,
            })
          }
        >
          Submit Rating
        </Button>
      )}
    </Flex>
  )
}

export default BreweryCard
