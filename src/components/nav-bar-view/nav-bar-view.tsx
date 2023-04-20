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
  Icon,
  Link,
} from "@chakra-ui/react"
import { FC, useRef } from "react"
import { NavBarViewProps } from "./nav-bar-view.props"
import { AiOutlineMenu } from "react-icons/ai"
import { MdLogout, MdLogin } from "react-icons/md"
import NextLink from "next/link"
import useUserProfile from "../../hooks/useUserProfile"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"

const NavBarView: FC<NavBarViewProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<any>()
  const profile = useUserProfile()
  const supabase = useSupabaseClient()
  const session = useSession()

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
              <Heading>The BreweryFinder</Heading>
            </DrawerHeader> */}

            <DrawerBody py="10">
              <VStack direction="column" align="start" spacing={8}>
                <Link as={NextLink} href="/">
                  <Heading>Home</Heading>
                </Link>
                <Link as={NextLink} href="/map">
                  <Heading>Map</Heading>
                </Link>
                {profile && (
                  <Link as={NextLink} href={`/profile/${profile.username}`}>
                    <Heading>Profile</Heading>
                  </Link>
                )}
                {session && (
                  <Link as={NextLink} href="/account">
                    <Heading>My Account</Heading>
                  </Link>
                )}
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              {session ? (
                <Button
                  variant="outline"
                  aria-label="Logout"
                  onClick={() => supabase.auth.signOut()}
                >
                  Logout
                  <Icon as={MdLogout} ml="2" />
                </Button>
              ) : (
                <Link href="/account">
                  <Button onClick={onClose}>
                    Login
                    <Icon as={MdLogin} ml="2" />
                  </Button>
                </Link>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </Flex>
  )
}

export default NavBarView
