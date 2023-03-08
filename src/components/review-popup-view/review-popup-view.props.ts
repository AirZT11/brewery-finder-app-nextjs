import { Dispatch, SetStateAction } from "react"
import { BreweryState } from "../../store/features/breweriesSlice"

export interface ReviewPopupViewProps {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
  onCloseComplete: () => void
}
