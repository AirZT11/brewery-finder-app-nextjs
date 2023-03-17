import { Dispatch, SetStateAction } from "react"
import { BreweryState } from "../../store/features/breweriesSlice"

export interface ReviewBreweryViewProps {
  /** Closes the modal or drawer */
  onClose?: () => void
}
