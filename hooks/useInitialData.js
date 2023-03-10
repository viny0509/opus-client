import { useEffect } from 'react'
import WalletConnectV2Services from 'services/WalletConnectV2'
import ReduxService from 'common/redux'
import useLoading from './useLoading'

// Call after rehydrated
const useInitialData = () => {
  const { setGlobalLoading } = useLoading()

  useEffect(() => {
    WalletConnectV2Services.initialize()
  }, [])

  useEffect(() => {
    setTimeout(() => setGlobalLoading(false), 1000)
  }, [])

  useEffect(() => {
    const getData = async () => {
      setGlobalLoading(true)
      await ReduxService.detectConnectionMethod()
      setGlobalLoading(false)
    }
    getData()
  }, [])
}

export default useInitialData
