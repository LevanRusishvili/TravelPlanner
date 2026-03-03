import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  headerReducer  from "./header/header.slice.js";
import countriesReducer from "./countries/countries.slice.js";
import  tripReducer from "./trip/trip.slice.js"; 
const rootReducer = combineReducers({
  header: headerReducer,
  countries: countriesReducer,
  trip: tripReducer,

});

export const store = configureStore({
 reducer: rootReducer,
 devTools: true,
});

export default store;