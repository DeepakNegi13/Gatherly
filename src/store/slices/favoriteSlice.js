import { createSlice } from "@reduxjs/toolkit"
const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { items: [] },
  reducers: {
    toggleFavorite(state, action) {
      const event = action.payload
      const existingEvent = state.items.find(e => (e._id || e.id) === (event.id || event._id))
      console.log(existingEvent)
      if (existingEvent) state.items =  state.items.filter(e => (e._id || e.id) != (event.id || event._id))
      else state.items.push(action.payload)
    },
    removeFavorite() {},
    clearFavorite() {},
  },
})
export const { toggleFavorite, removeFavorite, clearFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
