import { useCallback } from 'react'
import ReduxService from 'common/redux'
import { setModal } from 'redux/slices/modalSlice'

const useModal = () => {
  const openModal = useCallback(({ content = () => <>

      </>, width = 'auto', height = 'auto', radius = '10px', header = false, headerTitle = '', afterClose = null, background = '#ffffff', opacity = 1, boxShadow = null, closeable = true, closeWithEsc = true }) => {
    ReduxService.callDispatchAction(
      setModal({
        content,
        width,
        height,
        radius,
        background,
        headerTitle,
        header,
        afterClose,
        opacity,
        boxShadow,
        closeable,
        closeWithEsc,
      })
    )
  }, [])

  const closeModal = useCallback(() => {
    ReduxService.callDispatchAction(setModal(null))
  }, [])

  const clearAfterClose = useCallback(() => {
    ReduxService.callDispatchAction(
      setModal({
        ...(ReduxService.getModal() || {}),
        afterClose: null,
      })
    )
  }, [])

  return {
    closeModal,
    openModal,
    clearAfterClose,
  }
}

export default useModal
