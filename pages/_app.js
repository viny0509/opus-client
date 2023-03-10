import { useEffect, useMemo } from 'react'
import { wrapper } from 'redux/store'
import { useDispatch } from 'react-redux'
import { fetchSetting } from 'redux/slices/appSettingSlice'
import { fetchToken } from 'redux/slices/appTokenSlice'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/global.scss'
import Layout from 'components/Layout'
import AppWrapper from 'components/AppWrapper'
import ClientRender from 'components/ClientRender'
import AfterInitApp from 'components/AfterInitApp'
import { DrawerProvider } from 'components/MyDrawer/DrawerContext'
import { OverlayProvider } from 'components/MyOverlay/OverlayContext'
import { BreadscrumbProvider } from 'components/Breadcrumb/BreadscrumbContext'
import usePrevious from 'hooks/usePrevious'
import { isEqual } from 'lodash'

function MyApp({ Component, pageProps }) {
  const MainLayout = useMemo(() => {
    return Component.Layout || Layout
  }, [Component.Layout])
  const preLayoutProps = usePrevious(Component.LayoutProps || {})
  const layoutProps = useMemo(() => {
    if (!isEqual(preLayoutProps, Component.LayoutProps)) {
      return Component.LayoutProps
    }
    return preLayoutProps
  }, [Component.LayoutProps])

  const dispatch = useDispatch()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  })

  useEffect(() => {
    dispatch(fetchSetting())
    dispatch(fetchToken())
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <BreadscrumbProvider>
        <DrawerProvider>
          <OverlayProvider>
            <Head>
              {/* Why? => https://nextjs.org/docs/messages/no-document-title */}
              <title>OPUSLABS</title>
              {/* Why? => https://nextjs.org/docs/messages/no-document-viewport-meta */}
              <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no' />
            </Head>
            <ClientRender>
              <AppWrapper>
                <MainLayout {...layoutProps}>
                  <Component {...pageProps} />
                  <AfterInitApp />
                </MainLayout>
              </AppWrapper>
            </ClientRender>
          </OverlayProvider>
        </DrawerProvider>
      </BreadscrumbProvider>
    </QueryClientProvider>
  )
}

export default wrapper.withRedux(MyApp)
