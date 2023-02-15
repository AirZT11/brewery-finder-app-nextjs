import { Flex, Input } from "@chakra-ui/react"
import { FC } from "react"
import { SearchViewProps } from "./search-view.props"

const SearchView: FC<SearchViewProps> = () => {
  return (
    <Flex direction="column">
      <Input placeholder="Search Brewery..." variant="outline" size="lg" />
    </Flex>
  )
}

export default SearchView
