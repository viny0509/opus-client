import { useState, useEffect, useRef } from 'react'
import styles from './A2hs.module.css'
import { CloseOutlined } from '@ant-design/icons'

function A2hs({ title, icon, onA2hsClick }) {
  const [isShowBanner, setIsShowBanner] = useState(false)
  const buttonRef = useRef()
  // ---------------------
  const onCloseA2hs = () => setIsShowBanner(false)
  // ----------------------
  useEffect(() => {
    let deferredPrompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      // Update UI to notify the user they can add to home screen
      setIsShowBanner(true)

      buttonRef.current.addEventListener('click', () => {
        // hide our user interface that shows our A2HS button
        setIsShowBanner(false)
        // Show the prompt
        deferredPrompt.prompt()
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then(() => {
          // if (choiceResult.outcome === 'accepted') {
          //   console.log('User accepted the A2HS prompt')
          // } else {
          //   console.log('User dismissed the A2HS prompt')
          // }
          deferredPrompt = null
        })
      })
    })
  }, [])
  return (
    <div>
      {isShowBanner ? (
        <div className={styles['a2hs-banner']}>
          <div className={styles['a2hs-content']} ref={buttonRef}>
            {icon ? <img className={styles['a2hs-icon']} src={icon} /> : null}
            <div className={styles['a2hs-text']}>
              <a onClick={onA2hsClick}>{title || 'Add to home screen'}</a>
            </div>
          </div>
          <div className={styles['a2hs-close-btn']} onClick={onCloseA2hs}>
            <CloseOutlined style={{ fontSize: '12px', color: '#000000' }} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default A2hs
