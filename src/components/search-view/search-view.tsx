import {
  Flex,
  Input,
  Select,
  Button,
  Box,
  useRadio,
  useRadioGroup,
  HStack,
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

  const options = ["Name", "Zip", "City", "State", "Type"]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "searchFilter",
    defaultValue: "Name",
    onChange: setSearchBy,
  })

  const group = getRootProps()

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

  const handleSubmit = () => {
    searchBy === "Name" && getBrewsByName(input)
    searchBy === "Zip" && getBrewsByZip(input)
    searchBy === "City" && getBrewsByCity(input)
    searchBy === "State" && getBrewsByState(input)

    navigateToMapOnSubmit && router.push("/map")
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase()
    setInput(value)
    searchBy === "Type" && getBrewsByType(value)
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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit()
              }
            }}
          />
          <Button onClick={handleSubmit} size="lg">
            Search
          </Button>
        </Flex>
      ) : (
        <Select placeholder="Select Type" onChange={handleSelect}>
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
      <HStack {...group} w="100%">
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          )
        })}
      </HStack>
    </Flex>
  )
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default SearchView
