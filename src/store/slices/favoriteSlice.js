import { createSlice } from "@reduxjs/toolkit"
const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { items: JSON.parse(localStorage.getItem("eventsphere-favorites")) || [] },
  reducers: {
    toggleFavorite(state, action) {
      const event = action.payload
      const existingEvent = state.items.some(e => (e._id || e.id) === (event.id || event._id))
      if (existingEvent) {
        state.items = state.items.filter(e => (e._id || e.id) != (event.id || event._id))
      } else {
        state.items.push(action.payload)
      }
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
