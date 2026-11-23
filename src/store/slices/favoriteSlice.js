import { createSlice } from "@reduxjs/toolkit"

// This slice owns saved-event state and persists it for refreshes.
const favoriteSlice = createSlice({
  name: "favorite",
  // Restore the user's saved events from local storage during app initialization.
  initialState: { items: JSON.parse(localStorage.getItem("eventsphere-favorites")) || [] },
  reducers: {
    toggleFavorite(state, action) {
      const event = action.payload
      // Match events by either MongoDB _id or a normalized id field.
      const existingEvent = state.items.some(e => (e._id || e.id) === (event.id || event._id))
      if (existingEvent) {
        // Remove the event when it is already present in saved collections.
        state.items = state.items.filter(e => (e._id || e.id) != (event.id || event._id))
      } else {
        // Add the complete event object so cards can render it from favorites.
        state.items.push(action.payload)
      }
      // Synchronize Redux state with browser storage after every toggle.
      localStorage.setItem("eventsphere-favorites", JSON.stringify(state.items))
    },
    removeFavorite() {},
    clearFavorite(state) {
      state.items = []
      localStorage.clear("eventsphere-favorites")
    },
  },
})
export const { toggleFavorite, removeFavorite, clearFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
