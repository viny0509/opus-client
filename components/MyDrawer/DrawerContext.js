import { createContext, useState } from 'react'
import MyDrawer from '.'
const defaultValue = {
  open: false,
  wrapClassName: '',
  placement: 'bottom',
  content: <></>,
  afterClose: () => {},
}
export const DrawerContext = createContext(defaultValue)

const defaultConfig = {
  open: false,
  wrapClassName: '',
  noPadding: false,
  placement: 'bottom',
  content: <></>,
  afterClose: () => {},
}

export const DrawerProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultValue)

  const openDrawer = (config) => {
    setConfig((state) => ({ ...state, ...config, open: true }))
  }
  const closeDrawer = (callbackFunction) => {
    callbackFunction && callbackFunction()
    config.afterClose && config.afterClose()
    setConfig(defaultConfig)
  }

  return (
    <DrawerContext.Provider value={{ config, openDrawer, closeDrawer }}>
      {children}
      <MyDrawer config={config} closeDrawer={closeDrawer} />
    </DrawerContext.Provider>
  )
}
