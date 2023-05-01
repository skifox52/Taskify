import { createContext } from "react"

export const LoaderContext = createContext<{
  loading: boolean
  setLoading: (value: boolean) => void
  fetching: boolean
  setFetching: (value: boolean) => void
} | null>(null)
