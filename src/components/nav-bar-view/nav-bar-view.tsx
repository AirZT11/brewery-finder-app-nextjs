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

const NavBarView: FC<NavBarViewProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<any>()
  const profile = useUserProfile()

  return (
    <Flex
      w="full"
      p={{ base: "2", md: "4" }}
      justifyContent="space-between"
      bg="background.100"
    >
      <Link href="/">
        <Heading>BreweryFinder</Heading>
      </Link>
      <>
        <IconButton
          ref={btnRef}
          colorScheme="teal"
          aria-label="Open Nav"
          onClick={onOpen}
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
          <DrawerContent bg="background.100">
            <DrawerCloseButton />
            <DrawerHeader>
              <Heading>The Brewery Finder</Heading>
            </DrawerHeader>

            <DrawerBody>
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

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </Flex>
  )
}

export default NavBarView
