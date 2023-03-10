import { OverlayContext } from 'components/MyOverlay/OverlayContext'
import { useCallback, useContext } from 'react'

const useOverlay = () => {
  const { openOverlay: openD, closeOverlay: closeD } = useContext(OverlayContext)

  const openOverlay = useCallback(({ wrapClassName = '', background = '#ffffff', content = <></>, afterClose = () => {} }) => {
    openD({
      wrapClassName,
      background,
      content,
      afterClose,
    })
  }, [])

  const closeOverlay = useCallback((callbackFunction = null) => {
    closeD(callbackFunction)
  }, [])

  return { closeOverlay, openOverlay }
}

export default useOverlay
