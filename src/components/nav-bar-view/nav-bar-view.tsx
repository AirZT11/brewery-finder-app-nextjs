import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { FC, useRef } from "react"
import { NavBarViewProps } from "./nav-bar-view.props"
import { AiOutlineMenu } from "react-icons/ai"
import Link from "next/link"
import useUserProfile from "../../hooks/useUserProfile"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const NavBarView: FC<NavBarViewProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<any>()
  const profile = useUserProfile()
  const supabase = useSupabaseClient()

  return (
    <Flex
      w="full"
      py={2}
      px={{ base: "2", md: "4" }}
      justifyContent="space-between"
      bg="background.100"
      boxShadow="md"
    >
      <Link href="/">
        <Heading>BreweryFinder</Heading>
      </Link>
      <>
        <IconButton
          ref={btnRef}
          bg="background.100"
          borderWidth="2px"
          borderColor="background.100"
          _hover={{
            bg: "background.300",
          }}
          aria-label="Open Nav"
          onClick={onOpen}
          size="lg"
          icon={<AiOutlineMenu />}
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          ``
          <DrawerOverlay />
          <DrawerContent bg="background.100" borderLeftRadius={"xl"}>
            <DrawerCloseButton />
            {/* <DrawerHeader>
              <Heading>The Brewery Finder</Heading>
            </DrawerHeader> */}

            <DrawerBody py="10">
              <VStack direction="column" align="start" spacing={8}>
                <Link href="/">
                  <Heading>Home</Heading>
                </Link>
                <Link href="/map">
                  <Heading>Map</Heading>
                </Link>
                {profile && (
                  <Link href={`/profile/${profile.username}`}>
                    <Heading>Profile</Heading>
                  </Link>
                )}
                <Link href="/account">
                  <Heading>My Account</Heading>
                </Link>
              </VStack>
            </DrawerBody>

            {/* <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="button block"
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </Button>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </>
    </Flex>
  )
}

export default NavBarView
