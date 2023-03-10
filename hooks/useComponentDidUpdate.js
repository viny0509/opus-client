import React from 'react'
/**
 *
 * @param {React.EffectCallback} effect
 * @param {React.DependencyList} dependencies
 */
const useComponentDidUpdate = (effect, dependencies) => {
  const mounted = React.useRef(false)
  React.useEffect(() => {
    if (mounted.current) {
      const cleanupFunction = effect()
      return () => cleanupFunction && cleanupFunction()
    } else {
      mounted.current = true
    }
  }, dependencies)

  React.useEffect(() => {
    return () => (mounted.current = false)
  }, [])
}

export default useComponentDidUpdate
