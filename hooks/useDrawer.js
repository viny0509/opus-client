import { DrawerContext } from 'components/MyDrawer/DrawerContext'
import { useContext } from 'react'

const useDrawer = () => {
  const { openDrawer: openD, closeDrawer: closeD } = useContext(DrawerContext)

  const openDrawer = ({ wrapClassName = '', noPadding = false, placement = 'bottom', content = <></>, afterClose = () => {} }) => {
    openD({
      wrapClassName,
      placement,
      noPadding,
      content,
      afterClose,
    })
  }

  const closeDrawer = (callbackFunction = null) => {
    closeD(callbackFunction)
  }

  return { closeDrawer, openDrawer }
}

export default useDrawer
