// // store/header/header.slice.js
// import { createSlice } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// const initialState = {
//   isTripPageActive: false,
//   showTripSidebar: false, // Add this
// };

// const headerSlice = createSlice({
//   name: "header",
//   initialState,
//   reducers: {
//     setTripPageActive: (state, action) => {
//       state.isTripPageActive = action.payload;
//     },
//     toggleTripSidebar: (state) => {
//       state.showTripSidebar = !state.showTripSidebar;
//     },
//     setTripSidebar: (state, action) => {
//       state.showTripSidebar = action.payload;
//     },
//   },
// });

// export const { setTripPageActive, toggleTripSidebar, setTripSidebar } =
//   headerSlice.actions;
// export default headerSlice.reducer;



const initialState = {
  isHomePageActive: true,
  isTripPageActive: false,
  showTripSidebar: false,
  toggleTripSidebar: false,
}

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHomePageActive: (state, action) => {
      state.isHomePageActive = true;
      state.isTripPageActive = false;
      state.showTripSidebar = false;
    },
    setTripPageActive: (state, action) => {
      state.isTripPageActive = true;
      state.isHomePageActive = false;
     
    },
    toggleTripSidebar: (state) => {
    if(state.isTripPageActive) {
      state.showTripSidebar = !state.showTripSidebar;
    }
    }
  }

})
export const {setHomePageActive, setTripPageActive, toggleTripSidebar} = headerSlice.actions;
export default headerSlice.reducer;