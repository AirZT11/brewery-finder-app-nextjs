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
} from "@chakra-ui/react"
import { FC, useMemo, useState, memo } from "react"
import { MapViewProps } from "./map-view.props"
import { Map, Marker, useMap } from "react-map-gl/mapbox"
import { useUserLocation } from "../../hooks/useUserLocation"
import Image from "next/image"
import { useAppSelector } from "../../store/hooks"
import { TriangleDownIcon } from "@chakra-ui/icons"
import { BsCircleFill } from "react-icons/bs"
import { BiCurrentLocation } from "react-icons/bi"
import { useLazyGetBreweriesByLocationQuery } from "../../store/features/api/breweriesApiSlice"
import LoadingOverlay from "../loading-overlay/loading-overlay"
import { BreweryState } from "../../store/features/breweriesSlice"

const KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY

// Memoized Marker component
const BreweryMarker = memo(
  ({
    brewery,
    selectedBrew,
  }: {
    brewery: BreweryState
    selectedBrew: BreweryState | null
  }) => {
    const selected = brewery.id === selectedBrew?.id
    return (
      <Marker
        key={brewery.id}
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
  }
)

BreweryMarker.displayName = "BreweryMarker"

const MapView: FC<MapViewProps> = ({ children }) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const { myMapA } = useMap()
  const { location, loading } = useUserLocation()
  const [getBreweriesByLocation, result] = useLazyGetBreweriesByLocationQuery()

  const [viewState, setViewState] = useState({
    latitude: location?.lat || 40.678177,
    longitude: location?.lng || -73.94416,
    zoom: 6,
  })

  const breweries = useAppSelector((state) => state.breweries.breweriesList)
  const selectedBrew = useAppSelector(
    (state) => state.breweries.selectedBrewery
  )
  const breweriesLoading = useAppSelector(
    (state) => state.breweries.breweriesLoading
  )

  // Memoize brewery markers
  const breweryMarkers = useMemo(
    () =>
      breweries?.map((brewery) => (
        <BreweryMarker
          key={brewery.id}
          brewery={brewery}
          selectedBrew={selectedBrew}
        />
      )),
    [breweries, selectedBrew]
  )

  return (
    <Flex w="100%" h="100%">
      <Skeleton isLoaded={mapLoaded} w="100%" h="100%" fadeDuration={1}>
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
          {breweriesLoading && <LoadingOverlay />}
        </Map>
      </Skeleton>
    </Flex>
  )
}

export default memo(MapView)
