import { User } from "@supabase/supabase-js"
import { BreweryState } from "../../store/features/breweriesSlice"

export interface BreweryCardProps {
  brewery: BreweryState
}
