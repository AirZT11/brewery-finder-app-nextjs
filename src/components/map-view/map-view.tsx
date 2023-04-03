import {
  Flex,
  Icon,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Skeleton,
  IconButton,
  Box,
  Spinner,
} from "@chakra-ui/react"
import { FC, useMemo, useState } from "react"
import useToggle from "../../hooks/useToggle"
import { MapViewProps } from "./map-view.props"
import { Map, Marker, useMap } from "react-map-gl"
import { useUserLocation } from "../../hooks/useUserLocation"
// import { useGetBreweriesByLocationQuery } from "../../store/features/api/breweriesApiSlice"
import Image from "next/image"
import { useAppSelector } from "../../store/hooks"
import { TriangleDownIcon } from "@chakra-ui/icons"
import { BsCircleFill } from "react-icons/bs"
import { BiCurrentLocation } from "react-icons/bi"
import { useLazyGetBreweriesByLocationQuery } from "../../store/features/api/breweriesApiSlice"

const KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY

const MapView: FC<MapViewProps> = ({ children }) => {
  // const [selectedBrew, setSelectedBrew] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const { myMapA } = useMap()

  const { location, loading } = useUserLocation()
  const [getBreweriesByLocation, result] = useLazyGetBreweriesByLocationQuery()

  const [viewState, setViewState] = useState({
    latitude: location?.lat || 40.678177,
    longitude: location?.lng || -73.94416,
    zoom: 6,
  })
  // const dispatch = useAppDispatch()
  const breweries = useAppSelector((state) => state.breweries.breweriesList)
  const selectedBrew = useAppSelector(
    (state) => state.breweries.selectedBrewery
  )
  const breweriesLoading = useAppSelector(
    (state) => state.breweries.breweriesLoading
  )

  // Checks each brewery's marker position and sees if it within the current map's viewport
  // const checkPositionBounds = (breweriesArr: BreweryState[]) => {
  //   const checkIfPositionInViewport = (lat: number, lng: number) => {
  //     const bounds = mapRef?.current?.getMap().getBounds()
  //     return bounds?.contains([lng, lat])
  //   }

  //   breweriesArr.forEach((b) => {
  //     const isInBound = checkIfPositionInViewport(b.latitude, b.longitude)
  //     console.log("!@", b.name, isInBound, b.latitude, b.longitude)
  //   })
  // }

  const breweryMarkers = useMemo(
    () =>
      breweries?.map((brewery) => {
        const selected = brewery.id === selectedBrew?.id
        return (
          <Marker
            key={brewery.id}
            // The + converts a string into a number
            longitude={+brewery.longitude!}
            latitude={+brewery.latitude!}
            anchor="bottom"
            rotationAlignment="map"
          >
            <Popover placement="top">
              <PopoverTrigger>
                <Flex direction="column" align="center">
                  {selected && (
                    <Icon
                      as={BsCircleFill}
                      boxSize={10}
                      position="absolute"
                      color="red"
                      bottom={2.5}
                      right={-1}
                      opacity=".5"
                    />
                  )}
                  <Image
                    src="beerIcon.svg"
                    alt="beer-icon"
                    width="30"
                    height="30"
                  />

                  <TriangleDownIcon boxSize={4} opacity=".5" />
                </Flex>
              </PopoverTrigger>

              <PopoverContent w="100px">
                <PopoverBody>{brewery.name}</PopoverBody>
              </PopoverContent>
            </Popover>
          </Marker>
        )
      }),
    [breweries, selectedBrew]
  )

  console.log("!@ BreweriesLoading", breweriesLoading)

  return (
    <Flex w="100%" h="100%" /* filter="blur(10px)" */>
      <Skeleton isLoaded={mapLoaded} w="100%" h="100%">
        <Map
          attributionControl={false}
          id="myMapA"
          reuseMaps
          minZoom={3.5}
          onLoad={() => setMapLoaded(true)}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={KEY}
        >
          {breweryMarkers}
          <IconButton
            size="sm"
            position="absolute"
            boxShadow="md"
            bottom={5}
            right={5}
            aria-label="Find nearby breweries"
            icon={<BiCurrentLocation size="20" />}
            isDisabled={!location || loading}
            isLoading={loading}
            onClick={() => {
              if (location) {
                myMapA?.flyTo({
                  center: [location.lng, location.lat],
                  zoom: 11,
                  speed: 2,
                  curve: 1,
                })
                getBreweriesByLocation(location)
              }
            }}
          />
          <Box
            position={"absolute"}
            top="2"
            left="2"
            right={{ base: "2", md: "inherit" }}
            bottom={
              breweries.length > 0 ? { base: "60%", md: "10" } : "inherit"
            }
          >
            {children}
          </Box>
          {breweriesLoading && (
            <Box
              position="absolute"
              left="0"
              right="0"
              top="0"
              bottom="0"
              // // m="auto"
              h="full"
              w="full"
              bg="black"
              opacity=".3"
              // transition="200ms ease-in-out"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner size="xl" />
            </Box>
          )}
        </Map>
      </Skeleton>
    </Flex>
  )
}

export default MapView
