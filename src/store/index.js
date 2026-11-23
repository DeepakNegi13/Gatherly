import { configureStore } from "@reduxjs/toolkit"
import favoriteSlice from "./slices/favoriteSlice"

// Register reducers here so components can access centralized application state.
export const store = configureStore({ reducer: { favorite: favoriteSlice } })