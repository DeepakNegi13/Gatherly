import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filter",
  initialState: { formate: "" },
  reducers: {
    formate(state, action) {
      if (action.payload != "all formats") state.formate = action.payload
      else state.formate = ""
    },
  },
})
export const { formate } = filterSlice.actions
export default filterSlice.reducer
