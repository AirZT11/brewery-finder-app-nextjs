import { Flex, Spinner } from "@chakra-ui/react"
import { FC, useCallback, useMemo, useRef, useState } from "react"
import useToggle from "../../hooks/useToggle"
import { LatLngLiteral, MapOptions, MapViewProps } from "./map-view.props"

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  LoadScript,
  useJsApiLoader,
} from "@react-google-maps/api"
import mapStyles from "../../lib/mapStyles"
import { useGetBreweriesByLocationQuery } from "../../store/features/breweriesApiSlice"

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
}

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

  const mapRef = useRef<GoogleMap>()
  const [markerView, toggleMarkerView] = useToggle(true)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })
  const center = useMemo<LatLngLiteral>(() => ({ lat: 44, lng: -80 }), [])
  const options = useMemo<MapOptions>(
    () => ({
      styles: mapStyles,
      clickableIcons: false,
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  )
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])

  if (!isLoaded) return <Spinner />
  return (
    <Flex width="100%" height="100%">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={mapContainerStyle}
        options={options}
        onLoad={onLoad}
      ></GoogleMap>
    </Flex>
  )
}

export default MapView
