import { createContext, useState } from 'react'
import MyOverlay from '.'
const defaultValue = {
  open: false,
  wrapClassName: '',
  background: '#ffffff',
  content: <></>,
  afterClose: () => {},
}
export const OverlayContext = createContext(defaultValue)

export const OverlayProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultValue)

  const openOverlay = (config) => {
    setConfig((state) => ({ ...state, ...config, open: true }))
  }
  const closeOverlay = (callbackFunction) => {
    callbackFunction && callbackFunction()
    config.afterClose && config.afterClose()
    setConfig(defaultValue)
  }

  return (
    <OverlayContext.Provider value={{ config, openOverlay, closeOverlay }}>
      {children}
      {config.open && (
        <MyOverlay className={config.wrapClassName} background={config.background}>
          {config.content}
        </MyOverlay>
      )}
    </OverlayContext.Provider>
  )
}
