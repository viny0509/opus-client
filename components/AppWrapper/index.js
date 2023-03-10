import Loading from 'components/Loading'
import MyModal from 'components/MyModal'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import useLoading from 'hooks/useLoading'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import useInitialData from 'hooks/useInitialData'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useDrawer from 'hooks/useDrawer'

const Wrapper = styled.div`
  min-height: ${(props) => props.height};
  min-width: 100vw;
`

const AppBackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${(props) => props.zIndex || 10};
  min-height: ${(props) => props.height};
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`

const InitData = () => {
  useInitialData()
  return null
}

const AppWrapper = ({ children }) => {
  const { settingRedux, _persist } = useSelector((state) => state)
  const { loading } = useLoading()
  const { closeDrawer } = useDrawer()
  const router = useRouter()
  useEffect(() => {
    const onClose = () => {
      closeDrawer()
    }
    router.events.on('routeChangeStart', onClose)

    return () => {
      router.events.off('routeChangeStart', onClose)
    }
  }, [])

  return (
    <Wrapper height={`${window.innerHeight}px`}>
      <Head>
        <link rel='shortcut icon' id='my-favicon' href='/logo.png' />
        <title>OPUSLABS</title>
      </Head>
      {settingRedux && settingRedux?.main?.maintenance ? <div>Maintenance</div> : !loading && _persist?.rehydrated && <>{children}</>}
      {(loading || !_persist?.rehydrated) && (
        <AppBackgroundWrapper height={`${window.innerHeight}px`}>
          <Loading />
        </AppBackgroundWrapper>
      )}
      <MyModal />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      {_persist?.rehydrated && <InitData />}
    </Wrapper>
  )
}

export default AppWrapper
