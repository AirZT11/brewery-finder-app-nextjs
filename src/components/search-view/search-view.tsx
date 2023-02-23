import { Flex, Input } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useSearchBreweriesQuery } from "../../store/features/api/breweriesApiSlice"
import { SearchViewProps } from "./search-view.props"

const SearchView: FC<SearchViewProps> = () => {
  const [input, setInput] = useState("")
  useSearchBreweriesQuery(input, {
    skip: !input,
  })

  // console.log("!@ breweries: ", data)
  // console.log("!@ isLoading: ", isLoading)

  return (
    <Flex direction="column">
      <Input
        placeholder="Search Brewery..."
        variant="outline"
        size="lg"
        onChange={(e) => setInput(e.target.value)}
      />
    </Flex>
  )
}

export default SearchView
