import { Flex, Spinner } from "@chakra-ui/react"
import { FC, useCallback, useRef, useState } from "react"
import useToggle from "../../hooks/useToggle"
import { MapViewProps } from "./map-view.props"

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  LoadScript,
  useJsApiLoader,
} from "@react-google-maps/api"
import mapStyles from "../../../lib/mapStyles"

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

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
  const [markerView, toggleMarkerView] = useToggle(true)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  console.log("isLoaded", isLoaded)

  if (!isLoaded) return <Spinner />
  return (
    <Flex>
      <GoogleMap
        zoom={10}
        center={{ lat: 44, lng: -80 }}
        mapContainerStyle={mapContainerStyle}
      ></GoogleMap>
    </Flex>
  )
}

export default MapView
