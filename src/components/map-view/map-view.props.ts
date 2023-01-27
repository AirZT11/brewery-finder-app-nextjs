import { BreweryState } from "../../store/features/brewerySlice"

export interface MapViewProps {
  breweries: BreweryState[]
}

export type LatLngLiteral = google.maps.LatLngLiteral
export type DirectionsResult = google.maps.DirectionsResult
export type MapOptions = google.maps.MapOptions
