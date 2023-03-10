import useSignRequire from 'hooks/useSignRequire'

const AfterInitApp = () => {
  useSignRequire()
  return null
}

export default AfterInitApp
