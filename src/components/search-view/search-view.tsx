import { Flex, Input } from "@chakra-ui/react"
import { FC } from "react"
import { SearchViewProps } from "./search-view.props"

const SearchView: FC<SearchViewProps> = () => {
  return (
    <Flex direction="column">
      <h1>SearchView</h1>
      <Input variant="outline" size="small" />
    </Flex>
  )
}

export default SearchView
