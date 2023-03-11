import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* HTML Meta Tags */}
        <meta charSet='utf-8' />
        <link rel='shortcut icon' href={'https://ipfs.pantograph.app/ipfs/QmYjXuM96i9dFbjKgjN5FCzQHphGazN87phwhVxpBMNHnr'} />
        <meta name='theme-color' content='#000000' />
        <meta name='title' content='OPUSLABS' key='title' />
        <meta name='description' content='OPUSLABS' key='description' />

        {/* Google / Search Engine Tags */}
        <meta itemProp='name' content='OPUSLABS' key='googleDitle' />
        <meta itemProp='description' content='OPUSLABS' key='googleDescription' />
        <meta itemProp='image' content='https://ipfs.pantograph.app/ipfs/QmYjXuM96i9dFbjKgjN5FCzQHphGazN87phwhVxpBMNHnr' />

        {/* Facebook Meta Tags */}
        <meta property='og:url' content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='OPUSLABS' key='fbTitle' />
        <meta property='og:description' content='OPUSLABS' key='fbDescription' />
        <meta property='og:image' content='https://ipfs.pantograph.app/ipfs/QmYjXuM96i9dFbjKgjN5FCzQHphGazN87phwhVxpBMNHnr' />

        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={process.env.NEXT_PUBLIC_APP_URL} />
        <meta name='twitter:title' content='OPUSLABS' key='twTitle' />
        <meta name='twitter:description' content='OPUSLABS' key='twDescription' />
        <meta name='twitter:image' content='https://ipfs.pantograph.app/ipfs/QmYjXuM96i9dFbjKgjN5FCzQHphGazN87phwhVxpBMNHnr' />

        <meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
        <meta httpEquiv='Pragma' content='no-cache' />
        <meta httpEquiv='Expires' content='0' />
        {process.env.NEXT_PUBLIC_APP_ENV !== 'production' && <meta name='robots' content='noindex' />}

        {/* <link rel='shortcut icon' href='/favicon.ico' /> */}
        <link rel='manifest' href='/manifest.json' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.jpeg' />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {/* <meta name='google-site-verification' content='e427AGgSD3pCb-sFgQtfYoSrO158RNVslyGUpnC3WLY' /> */}

        {process.env.NEXT_PUBLIC_APP_ENV === 'production' && (
          <>
            {/* <script async src='https://www.googletagmanager.com/gtag/js?id=G-T7L7SWFGBC' />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-T7L7SWFGBC');
              `,
              }}
            /> */}
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
