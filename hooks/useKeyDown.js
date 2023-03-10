import { useEffect } from 'react'

const useKeyDown = (key, callback = () => {}) => {
  useEffect(() => {
    const listener = (event) => {
      if (event.key === key) {
        callback(event)
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [key, callback])
}

export default useKeyDown
