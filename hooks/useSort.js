import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const sortKeys = {
  new: {
    name: 'sort.new',
    sortBy: 'createdAt',
    sortDirection: 'desc',
  },
  rank: {
    name: 'sort.rank',
    sortBy: 'rankingScore',
    sortDirection: 'desc',
  },
  high: {
    name: 'sort.high', // low to hight
    sortBy: 'market.price',
    sortDirection: 'asc',
  },
  low: {
    name: 'sort.low', //  hight to low
    sortBy: 'market.price',
    sortDirection: 'desc',
  },
}

const useSort = () => {
  const router = useRouter()

  const sort = useMemo(() => {
    if (router?.query?.sort) {
      const sortParam = router.query?.sort?.toLowerCase()
      if (Object.keys(sortKeys).includes(sortParam)) {
        return {
          sort: sortParam,
          name: sortKeys[sortParam].name,
          sortBy: sortKeys[sortParam].sortBy,
          sortDirection: sortKeys[sortParam].sortDirection,
        }
      }
    }
    return {
      sort: 'new',
      name: sortKeys.new.name,
      sortBy: sortKeys.new.sortBy,
      sortDirection: sortKeys.new.sortDirection,
    }
  }, [router?.query?.sort])
  return sort
}

export default useSort
