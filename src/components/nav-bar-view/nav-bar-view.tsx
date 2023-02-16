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

const NavBarView: FC<NavBarViewProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  return (
    <Flex p="2" justifyContent="space-between" bg="background.200">
      <Heading>BreweryFinder</Heading>
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
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>The Brewery Finder</DrawerHeader>

            <DrawerBody>
              <Flex direction="column">
                <Link href="/">Home</Link>
                <Link href="/map">Map</Link>
                <Link href="/">Profile</Link>
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
