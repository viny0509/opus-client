import ReduxService from 'common/redux'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useCheckChain = (chainToCheck, enable = true) => {
  const [loadingCheckChain, setLoadingCheckChain] = useState(false)
  const chainConnected = useSelector((state) => state.chainConnected)

  useEffect(() => {
    const checkChain = async () => {
      if (chainToCheck && enable && parseInt(chainConnected) !== parseInt(chainToCheck)) {
        setLoadingCheckChain(true)
        if (await ReduxService.switchChain(chainToCheck)) {
          setLoadingCheckChain(false)
        } else {
          checkChain()
        }
      } else {
        setLoadingCheckChain(false)
      }
    }

    checkChain()
  }, [chainConnected, chainToCheck, enable])

  return {
    loadingCheckChain,
  }
}

export default useCheckChain
