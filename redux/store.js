import { configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { REDUX_PERSIST_WHITELIST } from 'constants/redux'
import rootReducer from './reducers'

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

let storeRedux

export const makeStore = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    storeRedux = configureStore({
      reducer,
    })
    return storeRedux
  } else {
    const initialState = {}
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default
    const persistConfig = {
      key: 'nextjs',
      whitelist: [...REDUX_PERSIST_WHITELIST],
      storage, // if needed, use a safer storage
    }

    // Create a new reducer with our existing reducer
    const persistedReducer = persistReducer(persistConfig, reducer)

    storeRedux = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      preloadedState: initialState,
    })

    // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
    storeRedux.__persistor = persistStore(storeRedux)
    return storeRedux
  }
}

// Export for wrapping in _app.js
export const wrapper = createWrapper(makeStore, { debug: process.env.NEXT_PUBLIC_APP_ENV === 'development' })

// Export store for access directly from outside of component
// => https://stackoverflow.com/a/61158677
// ex: access store from common/redux.js
export { storeRedux }
