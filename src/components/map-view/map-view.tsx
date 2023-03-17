import { Box, Flex, Spinner, Text, Icon } from "@chakra-ui/react"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import useToggle from "../../hooks/useToggle"
import { MapViewProps } from "./map-view.props"
import { Map, Marker } from "react-map-gl"
import { useUserLocation } from "../../hooks/useUserLocation"
// import { useGetBreweriesByLocationQuery } from "../../store/features/api/breweriesApiSlice"
import Image from "next/image"
import { useSelector } from "react-redux"
import { useAppSelector } from "../../store/hooks"

const KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY

// .sidebar {
//   background-color: rgba(35, 55, 75, 0.9);
//   color: #fff;
//   padding: 6px 12px;
//   font-family: monospace;
//   z-index: 1;
//   position: absolute;
//   top: 0;
//   left: 0;
//   margin: 12px;
//   border-radius: 4px;
//   }

const MapView: FC<MapViewProps> = (
  {
    // breweries,
    // userLocation,
    // display,
    // displayList,
    // mapWidth,
    // mapHeight,
    // mapZoom,
    // mapCenter,
  }
) => {
  // const [selectedBrew, setSelectedBrew] = useState(null)

  const { location, loading } = useUserLocation()
  const breweries = useAppSelector((state) => state.breweries.breweriesList)
  const [markerView, toggleMarkerView] = useToggle(true)

  if (loading)
    return (
      <Flex w="100%" h="100%">
        <Spinner />
      </Flex>
    )
  return (
    <Flex w="100%" h="100%" /* filter="blur(10px)" */>
      <Map
        onLoad={() => console.log("LOADED")}
        initialViewState={{
          latitude: location?.lat,
          longitude: location?.lng,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={KEY}
      >
        {breweries?.map((brewery) => (
          <Marker
            key={brewery.id}
            // The + converts a string into a number
            longitude={+brewery.longitude!}
            latitude={+brewery.latitude!}
            anchor="bottom"
            rotationAlignment="map"
          >
            <Image src="beerIcon.svg" alt="beer-icon" width="40" height="40" />
          </Marker>
        ))}
      </Map>
    </Flex>
  )
}

export default MapView
