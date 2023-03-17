import {
  Flex,
  Input,
  Radio,
  RadioGroup,
  Select,
  Button,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { FC, useState } from "react"
import {
  useLazyGetBrewsByCityQuery,
  useLazyGetBrewsByNameQuery,
  useLazyGetBrewsByStateQuery,
  useLazyGetBrewsByTypeQuery,
  useLazyGetBrewsByZipQuery,
} from "../../store/features/api/breweriesApiSlice"
import { SearchViewProps } from "./search-view.props"
import debounce from "lodash.debounce"
import { useRouter } from "next/router"

const SearchView: FC<SearchViewProps> = ({ navigateToMapOnSubmit = false }) => {
  const [input, setInput] = useState("")
  const [searchBy, setSearchBy] = useState("Name")

  const [getBrewsByName] = useLazyGetBrewsByNameQuery()
  const [getBrewsByZip] = useLazyGetBrewsByZipQuery()
  const [getBrewsByCity] = useLazyGetBrewsByCityQuery()
  const [getBrewsByState] = useLazyGetBrewsByStateQuery()
  const [getBrewsByType] = useLazyGetBrewsByTypeQuery()

  const router = useRouter()

  // TODO: Utilize debounce for autocomplete via BreweryDB API
  // const onInput = debounce((e) => {
  //   setInput(e.target.value)
  // }, 500)

  const onInput = (e: any) => setInput(e.target.value)

  const onSelect = (e: any) => {
    // setInput("")
    setSearchBy(e.target.value)
  }

  const handleSubmit = () => {
    searchBy === "Name" && getBrewsByName(input)
    searchBy === "Zip" && getBrewsByZip(input)
    searchBy === "City" && getBrewsByCity(input)
    searchBy === "State" && getBrewsByState(input)
    searchBy === "Type" && getBrewsByType(input)

    navigateToMapOnSubmit && router.push("/map")
  }

  return (
    <Flex direction="column">
      {searchBy !== "Type" ? (
        <Flex>
          <Input
            placeholder="Search Brewery..."
            variant="outline"
            size="lg"
            onChange={onInput}
          />
          <Button onClick={handleSubmit} size="lg">
            Search
          </Button>
        </Flex>
      ) : (
        <Select
          placeholder="Select Type"
          onChange={(e) => {
            const value = e.target.value.toLowerCase()
            setInput(value)
            handleSubmit()
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
