import { parseQueryParams } from 'common/function'
import { defaultStoreFilter, keysStoreFilter } from 'components/FilterStore'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import useSearch from './useSearch'
import useSort from './useSort'

const useStoreFilter = () => {
  const router = useRouter()
  const { sortBy, sortDirection } = useSort()
  const { key } = useSearch()
  const countFilter = useMemo(() => {
    let count = 0
    const query = { ...router?.query }
    Object.keys(query).forEach((key) => {
      if (keysStoreFilter.includes(key)) {
        if (typeof query[key] === 'string') {
          count++
        }
        if (Array.isArray(query[key])) {
          count = count + query[key].length
        }
      }
    })
    return count
  }, [router.query])

  const filters = useMemo(() => {
    const query = {}
    Object.keys(router?.query).forEach((key) => {
      if (keysStoreFilter.includes(key)) {
        if (Array.isArray(defaultStoreFilter[key])) {
          query[key] = typeof router.query[key] === 'string' ? [router.query[key]] : router.query[key]
        } else {
          query[key] = router.query[key]
        }
      }
    })
    return { ...defaultStoreFilter, ...parseQueryParams(query), sortBy, sortDirection, key }
  }, [router.query, sortDirection, sortBy, key])

  return {
    countFilter,
    filters,
  }
}

export default useStoreFilter
