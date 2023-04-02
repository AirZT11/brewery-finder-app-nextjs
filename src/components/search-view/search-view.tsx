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
import { FC, useEffect, useState } from "react"
import {
  useGetBreweriesByLocationQuery,
  useLazyGetBrewsByCityQuery,
  useLazyGetBrewsByNameQuery,
  useLazyGetBrewsByStateQuery,
  useLazyGetBrewsByTypeQuery,
  useLazyGetBrewsByZipQuery,
} from "../../store/features/api/breweriesApiSlice"
import { SearchViewProps } from "./search-view.props"
import { useRouter } from "next/router"
import { useMap } from "react-map-gl"
import { useUserLocation } from "../../hooks/useUserLocation"

const SearchView: FC<SearchViewProps> = ({ navigateToMapOnSubmit = false }) => {
  const [input, setInput] = useState("")
  const [searchBy, setSearchBy] = useState("Name")
  const { myMapA } = useMap()
  const { location } = useUserLocation()

  const options = ["Name", "Zip", "City", "State", "Type"]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "searchFilter",
    defaultValue: "Name",
    onChange: setSearchBy,
  })

  const group = getRootProps()

  const [getBrewsByName, nameResults] = useLazyGetBrewsByNameQuery()
  const [getBrewsByZip, zipResults] = useLazyGetBrewsByZipQuery()
  const [getBrewsByCity, cityResults] = useLazyGetBrewsByCityQuery()
  const [getBrewsByState, stateResults] = useLazyGetBrewsByStateQuery()
  const [getBrewsByType, typeResults] = useLazyGetBrewsByTypeQuery()

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (
      nameResults.isLoading ||
      zipResults.isLoading ||
      cityResults.isLoading ||
      stateResults.isLoading ||
      typeResults.isLoading
    ) {
      console.log("!@ setLoading true")
      setLoading(true)
    } else {
      console.log("!@ setLoading false")
      setLoading(false)
    }
  }, [
    loading,
    nameResults.isLoading,
    zipResults.isLoading,
    cityResults.isLoading,
    stateResults.isLoading,
    typeResults.isLoading,
  ])

  const router = useRouter()

  // TODO: Utilize debounce for autocomplete via BreweryDB API
  // const onInput = debounce((e) => {
  //   setInput(e.target.value)
  // }, 500)

  const onInput = (e: any) => setInput(e.target.value)

  const zoomMapOut = () =>
    location &&
    myMapA?.flyTo({
      center: [location.lng, location.lat],
      zoom: 3,
      speed: 2,
      curve: 1,
    })

  const handleSubmit = () => {
    navigateToMapOnSubmit && router.push("/map")
    searchBy === "Name" && getBrewsByName(input)
    searchBy === "Zip" && getBrewsByZip(input)
    searchBy === "City" && getBrewsByCity(input)
    searchBy === "State" && getBrewsByState(input)
    zoomMapOut()
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase()
    setInput(value)
    searchBy === "Type" && getBrewsByType(value)
    zoomMapOut()
  }

  return (
    <Flex direction="column" w={{ base: "100%", md: "auto" }} align="center">
      {searchBy !== "Type" ? (
        <Flex w="full">
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
            style={
              input
                ? { borderTopRightRadius: "0", borderBottomRightRadius: "0" }
                : undefined
            }
            padding={7}
            w="full"
          />

          {input && (
            <Button
              isLoading={loading}
              onClick={handleSubmit}
              size="lg"
              variant="outline"
              // colorScheme="blackAlpha"
              style={
                input
                  ? { borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }
                  : undefined
              }
              disabled={!input}
              padding={7}
            >
              Search
            </Button>
          )}
        </Flex>
      ) : (
        <Select placeholder="Select Type" onChange={handleSelect} size={"lg"}>
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
      <HStack
        {...group}
        mt="2"
        w="100%"
        overflowX="auto"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
        justify="center"
      >
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

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "brand.primary",
          color: "black",
          // borderColor: "black",
          // borderWidth: "4px",
        }}
        // _focus={{
        //   boxShadow: "outline",
        // }}
        px={4}
        py={2}
        textAlign="center"
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default SearchView
