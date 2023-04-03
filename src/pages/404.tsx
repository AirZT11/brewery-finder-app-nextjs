import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Layout from "../components/layout/layout"

export default function Custom404() {
  const router = useRouter()

  return (
    <Layout>
      <VStack w="full" h="full" justify="center" align="center" spacing={5}>
        <Heading>Sorry! Page Not Found</Heading>
        <Text>Please try another page</Text>
        <Button onClick={() => router.push("/")}>Go Home</Button>
      </VStack>
    </Layout>
  )
}
