import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name:"favorite",
  initialState:{},
  reducers:{
    toggleFavorite(state){
      console.log("deepak")
      console.log(state)
    },
    removeFavorite(){},
    clearFavorite(){}
  }
})
export const {toggleFavorite,removeFavorite,clearFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer