import { Flex, Spinner } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import NavBarView from "../nav-bar-view/nav-bar-view"

interface LayoutProps {
  children: ReactNode
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      // bg="brand.primary"
      bgGradient={"linear(to-b, rgb(255 220 98), brand.primary)"}
    >
      <NavBarView />
      {children}
    </Flex>
  )
}

export default Layout
