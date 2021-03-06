// import { compose, applyMiddleware, createStore } from "redux"
// import thunk from "redux-thunk"
// import { persistStore, persistReducer } from "redux-persist"
// //import storage from "redux-persist/lib/storage";
// import AsyncStorage from "@react-native-community/async-storage"
// import reducer from "./reducers"

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
// }

// const middlewares = [thunk]

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`)

//   middlewares.push(logger)
// }

// export default function configureStore() {
//   const enhancer = compose(applyMiddleware(...middlewares))
//   const persistedReducer = persistReducer(persistConfig, reducer)
//   const store = createStore(persistedReducer, enhancer)
//   const persistor = persistStore(store)
//   return { store, persistor }
// }

//import AsyncStorage from "@react-native-community/async-storage"
//import storage from "redux-persist/lib/storage"
import FilesystemStorage from 'redux-persist-filesystem-storage'
import { persistStore, persistReducer } from "redux-persist"


import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

const composeEnhancer =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose

const persistConfig = {
  key: "async",
  storage: FilesystemStorage,
  timeout: 0,
  whitelist: ["user", "travel", "places", "budget"],
}
const initialState = {}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, initialState, composeEnhancer(applyMiddleware(thunk)))
let persistor = persistStore(store)

export default {
  store,
  persistor,
}

export { store, persistor }

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const composeEnhancer =
//   (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose

// const configureStore = () => {
//   return createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))
// }

// export default configureStore
