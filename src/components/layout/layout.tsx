import { Flex, Spinner } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import NavBarView from "../nav-bar-view/nav-bar-view"

interface LayoutProps {
  children: ReactNode
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" w="100vw" h="100vh">
      <NavBarView />
      {children}
    </Flex>
  )
}

export default Layout
