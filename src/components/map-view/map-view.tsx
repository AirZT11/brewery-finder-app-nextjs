import { Box, Flex, Spinner, Text, Icon } from "@chakra-ui/react"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import useToggle from "../../hooks/useToggle"
import { MapViewProps } from "./map-view.props"
import { GeolocateControl, Map, MapRef, Marker, useMap } from "react-map-gl"
import { useUserLocation } from "../../hooks/useUserLocation"
// import { useGetBreweriesByLocationQuery } from "../../store/features/api/breweriesApiSlice"
import Image from "next/image"
import { useSelector } from "react-redux"
import { useAppSelector } from "../../store/hooks"
import { BreweryState } from "../../store/features/breweriesSlice"
import { ChevronDownIcon, TriangleDownIcon } from "@chakra-ui/icons"

const KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY

const MapView: FC<MapViewProps> = ({}) => {
  // const [selectedBrew, setSelectedBrew] = useState(null)
  const mapRef = useRef<MapRef>()

  const { location, loading } = useUserLocation()
  const [viewState, setViewState] = useState({
    latitude: location?.lat || 40.678177,
    longitude: location?.lng || -73.94416,
    zoom: 6,
  })
  const breweries = useAppSelector((state) => state.breweries.breweriesList)
  const [markerView, toggleMarkerView] = useToggle(true)

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

  const { myMapA } = useMap()

  const breweryMarkers = useMemo(
    () =>
      breweries?.map((brewery) => (
        <Marker
          key={brewery.id}
          // The + converts a string into a number
          longitude={+brewery.longitude!}
          latitude={+brewery.latitude!}
          anchor="bottom"
          rotationAlignment="map"
        >
          <Flex direction="column" align="center">
            <Image src="beerIcon.svg" alt="beer-icon" width="30" height="30" />
            <TriangleDownIcon boxSize={4} opacity=".5" />
          </Flex>
        </Marker>
      )),
    [breweries]
  )

  if (loading)
    return (
      <Flex w="100%" h="100%">
        <Spinner />
      </Flex>
    )
  return (
    <Flex w="100%" h="100%" /* filter="blur(10px)" */>
      <Map
        id="myMapA"
        onRender={() => console.log("!@ MAP RENDERED")}
        // ref={mapRef}
        reuseMaps
        minZoom={3.5}
        onLoad={() => console.log("LOADED")}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        // style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={KEY}
      >
        {breweryMarkers}
        <GeolocateControl position="bottom-right" />
      </Map>
    </Flex>
  )
}

export default MapView
