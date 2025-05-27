import {
  Flex,
  Input,
  Select,
  Button,
  Box,
  useRadio,
  useRadioGroup,
  HStack,
  useToast,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import {
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
import { UseQueryStateResult } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setBreweriesLoading } from "../../store/features/breweriesSlice"

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

  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.breweries.breweriesLoading)

  const router = useRouter()
  const toast = useToast()

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

  const handleToast = (breweryResponse: any) => {
    if (breweryResponse.length === 0) {
      toast({
        title: "Sorry, no breweries found.",
        description: "Please try another search.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  // Handles the actions => response from the brewery query
  const handleBrewQueryResponse = (response: any) => {
    zoomMapOut()
    handleToast(response.data)
    if (!response.data.isLoading) {
      dispatch(setBreweriesLoading(false))
    }
  }

  const handleSubmit = () => {
    navigateToMapOnSubmit && router.push("/map")
    dispatch(setBreweriesLoading(true))
    searchBy === "Name" && getBrewsByName(input).then(handleBrewQueryResponse)
    searchBy === "Zip" && getBrewsByZip(input).then(handleBrewQueryResponse)
    searchBy === "City" && getBrewsByCity(input).then(handleBrewQueryResponse)
    searchBy === "State" && getBrewsByState(input).then(handleBrewQueryResponse)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase()
    setInput(value)
    searchBy === "Type" && getBrewsByType(value).then(handleBrewQueryResponse)
    zoomMapOut()
  }

  return (
    <Flex direction="column" w={{ base: "100%", md: "auto" }} align="center">
      {searchBy !== "Type" ? (
        <Flex w="full">
          <Input
            bg="white"
            placeholder={`Search Brewery By ${searchBy}...`}
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
              bg="background.100"
              color="black"
              _hover={{
                bg: "white",
              }}
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
        <Select
          placeholder="Select Type"
          cursor="pointer"
          onChange={handleSelect}
          size={"lg"}
          h="58px"
          bg="white"
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
  const { getInputProps } = useRadio(props)

  const input = getInputProps()
  // const checkbox = getCheckboxProps()

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Box
        // {...checkbox}
        cursor="pointer"
        // borderWidth="1px"
        borderRadius="md"
        boxShadow="sm"
        bg="background.100"
        color="black"
        fontWeight="bold"
        _hover={{
          bg: "white",
          boxShadow: "xl",
        }}
        _checked={{
          bg: "black",
          color: "white",
          boxShadow: "xl",
        }}
        transition="150ms"
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
