import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name:"favorite",
  initialState:{},
  reducers:{
    toggleFavorite(){},
    removeFavorite(){},
    clearFavorite(){}
  }
})
export const {toggleFavorite,removeFavorite,clearFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer