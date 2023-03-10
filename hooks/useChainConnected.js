import { CHAIN_DATA } from 'constants/chain'
import { useDispatch, useSelector } from 'react-redux'
import { setConnectedChain } from 'redux/slices/connectedChainSlice'

const useChainConnected = () => {
  const dispatch = useDispatch()
  const chainConnected = useSelector((state) => state.chainConnected)
  return {
    chainId: chainConnected,
    chainConnected: CHAIN_DATA[chainConnected],
    setChainConnected: (chainId) => dispatch(setConnectedChain(Number(chainId))),
  }
}

export default useChainConnected
