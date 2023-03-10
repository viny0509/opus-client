import { useRouter } from 'next/router'
import { useMemo } from 'react'

const useSearch = () => {
  const router = useRouter()

  const search = useMemo(() => {
    if (router?.query?.search) {
      const search = router.query?.search?.toLowerCase()
      return {
        key: search,
      }
    }
    return {
      key: undefined,
    }
  }, [router?.query?.search])
  return search
}

export default useSearch
