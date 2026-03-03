// store/trip/trip.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrip: [],
  savedTrips: [],
  nextTripNumber: 1, // Add this to track next trip number
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: { 
    addToTrip: (state, action) => {
      const country = action.payload;
      const exists = state.currentTrip.some((c) => c.cca2 === country.cca2);
      if (!exists) {
        state.currentTrip.push(country);
      }
    },
    removeFromTrip: (state, action) => {
      const countryCode = action.payload;
      state.currentTrip = state.currentTrip.filter(
        (c) => c.cca2 !== countryCode,
      );
    },
    clearTrip: (state) => {
      state.currentTrip = [];
    },
    saveTrip: (state, action) => {
      // Get the next available trip number
      let tripNumber = state.nextTripNumber;
      let tripName = action.payload;

      if (!tripName) {
        // Find the next available trip number
        const usedNumbers = state.savedTrips.map((trip) => {
          const match = trip.name.match(/Trip (\d+)/);
          return match ? parseInt(match[1]) : 0;
        });

        // Find the smallest unused number
        while (usedNumbers.includes(tripNumber)) {
          tripNumber++;
        }

        tripName = `Trip ${tripNumber}`;
        state.nextTripNumber = tripNumber + 1;
      }

      const newTrip = {
        id: Date.now(),
        name: tripName,
        countries: [...state.currentTrip],
        date: new Date().toLocaleDateString(),
      };
      state.savedTrips.push(newTrip);
    },
    loadTrip: (state, action) => {
      const tripId = action.payload;
      const savedTrip = state.savedTrips.find((trip) => trip.id === tripId);
      if (savedTrip) {
        state.currentTrip = [...savedTrip.countries];
      }
    },
    deleteSavedTrip: (state, action) => {
      const tripId = action.payload;
      state.savedTrips = state.savedTrips.filter((trip) => trip.id !== tripId);
    },
  },
});

export const {
  addToTrip,
  removeFromTrip,
  clearTrip,
  saveTrip,
  loadTrip,
  deleteSavedTrip,
} = tripSlice.actions;
export default tripSlice.reducer;
