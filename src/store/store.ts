import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import usersReducer from "./features/userSlice"
import breweriesReducer from "./features/breweriesSlice"
import { breweriesApi } from "./features/api/breweriesApiSlice"
import { createWrapper } from "next-redux-wrapper"
import { ratingsApi } from "./features/api/ratingsApiSlice"

const rootReducer = combineReducers({
  [breweriesApi.reducerPath]: breweriesApi.reducer,
  [ratingsApi.reducerPath]: ratingsApi.reducer,
  users: usersReducer,
  breweries: breweriesReducer,
})

/**
 * Creates a store and includes all the slices as reducers.
 */
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        breweriesApi.middleware,
        ratingsApi.middleware
      ),
  })

// Included to initiate SSR with Nextjs
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>

// Inferred type: { users: UsersState}
export type AppDispatch = AppStore["dispatch"]

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(makeStore().dispatch)

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
// export default store
