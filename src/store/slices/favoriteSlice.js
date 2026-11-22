import { createSlice } from "@reduxjs/toolkit"
import { toast } from "sonner"
const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { items: [] },
  reducers: {
    toggleFavorite(state, action) {
      const event = action.payload
      const existingEvent = state.items.find(e => (e._id || e.id) === (event.id || event._id))
      if (existingEvent) {
        state.items = state.items.filter(e => (e._id || e.id) != (event.id || event._id))
        toast.error("Event removed from saved section", { duration: 1000 })
      } else {
        state.items.push(action.payload)
        toast.success("Event Saved Succesfully", { duration: 1000 })
      }
    },
    removeFavorite() {},
    clearFavorite(state) {
      let actualLength = state.items.length
      for (let i = 0; i < actualLength; i++) {
        state.items.pop()
      }
    },
  },
})
export const { toggleFavorite, removeFavorite, clearFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
