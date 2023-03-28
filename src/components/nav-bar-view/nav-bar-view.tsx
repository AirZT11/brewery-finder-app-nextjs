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
} from "@chakra-ui/react"
import { FC, useRef } from "react"
import { NavBarViewProps } from "./nav-bar-view.props"
import { AiOutlineMenu } from "react-icons/ai"
import Link from "next/link"
import { useUser } from "@supabase/auth-helpers-react"
import useUserProfile from "../../hooks/useUserProfile"

const NavBarView: FC<NavBarViewProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<any>()
  const profile = useUserProfile()

  return (
    <Flex w="full" p="4" justifyContent="space-between" bg="background.100">
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
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>The Brewery Finder</DrawerHeader>

            <DrawerBody>
              <Flex direction="column">
                <Link href="/">Home</Link>
                <Link href="/map">Map</Link>
                {profile && (
                  <Link href={`/profile/${profile.username}`}>Profile</Link>
                )}
                <Link href="/account">My Account</Link>
              </Flex>
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
