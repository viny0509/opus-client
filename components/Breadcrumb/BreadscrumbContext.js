import usePrevious from 'hooks/usePrevious'
import { useRouter } from 'next/router'
import { createContext } from 'react'

export const BreadscrumbContext = createContext({ preRoute: undefined })
export const BreadscrumbProvider = ({ children }) => {
  const router = useRouter()
  const preRoute = usePrevious(router.asPath)
  return <BreadscrumbContext.Provider value={{ preRoute }}>{children}</BreadscrumbContext.Provider>
}
