import {
  Flex,
  FormLabel,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Select,
  Button,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { FC, useState } from "react"
import {
  useGetBrewsByCityQuery,
  useGetBrewsByNameQuery,
  useGetBrewsByStateQuery,
  useGetBrewsByTypeQuery,
  useGetBrewsByZipQuery,
} from "../../store/features/api/breweriesApiSlice"
import { SearchViewProps } from "./search-view.props"
import debounce from "lodash.debounce"

const SearchView: FC<SearchViewProps> = () => {
  const [input, setInput] = useState("")
  const [searchBy, setSearchBy] = useState("Name")

  useGetBrewsByNameQuery(input, {
    skip: !input || searchBy !== "Name",
  })
  useGetBrewsByZipQuery(input, {
    skip: !input || searchBy !== "Zip",
  })
  useGetBrewsByCityQuery(input, {
    skip: !input || searchBy !== "City",
  })
  useGetBrewsByStateQuery(input, {
    skip: !input || searchBy !== "State",
  })
  useGetBrewsByTypeQuery(input, {
    skip: !input || searchBy !== "Type",
  })

  const onInput = debounce((e) => {
    setInput(e.target.value)
  }, 500)

  const onSelect = (e: any) => {
    setInput("")
    setSearchBy(e.target.value)
  }

  return (
    <Flex direction="column">
      {searchBy !== "Type" ? (
        <Input
          placeholder="Search Brewery..."
          variant="outline"
          size="lg"
          onChange={onInput}
        />
      ) : (
        <Select
          placeholder="Select Type"
          onChange={(e) => {
            const value = e.target.value.toLowerCase()
            setInput(value)
          }}
        >
          <option>Micro</option>
          <option>Nano</option>
          <option>Regional</option>
          <option>Brewpub</option>
          <option>Large</option>
          <option>Planning</option>
          <option>Bar</option>
          <option>Contract</option>
          <option>Proprietor</option>
          <option>Closed</option>
        </Select>
      )}
      <RadioGroup defaultValue="Name" my="2">
        <Flex direction="row" justify="space-between">
          <Radio defaultChecked size="sm" value="Name" onChange={onSelect}>
            Name
          </Radio>
          <Radio size="sm" value="Zip" onChange={onSelect}>
            Zip
          </Radio>
          <Radio size="sm" value="City" onChange={onSelect}>
            City
          </Radio>
          <Radio size="sm" value="State" onChange={onSelect}>
            State
          </Radio>
          <Radio size="sm" value="Type" onChange={onSelect}>
            Type
          </Radio>
        </Flex>
      </RadioGroup>
    </Flex>
  )
}

export default SearchView
