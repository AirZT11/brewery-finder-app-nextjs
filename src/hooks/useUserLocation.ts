import { useEffect, useState } from "react"
import { Location } from "../store/features/breweriesSlice"

export const useUserLocation = () => {
  const [location, setLocation] = useState<Location>()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords
        setLocation({ lat: latitude, lng: longitude })
        setLoading(false)
      },
      (error) => {
        if (error) {
          setError(true)
          setLoading(false)
        } else {
          setError(false)
        }
      }
    )
  }, [])

  return { location, error, loading }
}
