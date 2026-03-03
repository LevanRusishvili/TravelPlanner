// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries } from "./countries.thunks";

// // Fetch countries with more image fields
// export const fetchCountries = createAsyncThunk(
//   "countries/fetchCountries",
//   async (_, thunkAPI) => {
//     try {
//       // Request more image data: flags, coat of arms, maps
//       const res = await fetch(
//         "https://restcountries.com/v3.1/all?fields=name,flags,coatOfArms,maps,cca2,cca3,capital,region,population"
//       );

//       if (!res.ok) {
//         throw new Error(`Failed to fetch countries. Status: ${res.status}`);
//       }

//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.message || "Unknown error occurred"
//       );
//     }
//   }
// );

// const initialState = {
//   countries: [],
//   loading: false,
//   error: null,
//   selectedCountry: null,
// };

// const countriesSlice = createSlice({
//   name: "countries",
//   initialState,
//   reducers: {
//     clearCountries: (state) => {
//       state.countries = [];
//       state.error = null;
//       state.selectedCountry = null;
//     },
//     selectCountry: (state, action) => {
//       state.selectedCountry = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCountries.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCountries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.countries = action.payload;
//       })
//       .addCase(fetchCountries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearCountries, selectCountry } = countriesSlice.actions;
// export default countriesSlice.reducer;
// export const countriesReducer = countriesSlice.reducer;


// const initialState = {
//   countries: [],
//   loading: false,
//   error: null,
  
// };

// const countriesSlice = createSlice({
//   name: "countries",
//   initialState,
//   reducers: {},
//   // 🔴 OLD WAY (WRONG) - Object notation:
//   // extraReducers: {
//   //   [fetchCountries.pending.type]: (state) => { ... }
//   // }

//   // ✅ NEW WAY (CORRECT) - Builder callback:
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCountries.pending, (state) => {
//         state.loading = true;
//         state.error = null; // Fixed: should be state.error, not just error
//       })
//       .addCase(fetchCountries.fulfilled, (state, action) => {
//         state.loading = false; // Fixed: should be false, not true
//         state.countries = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchCountries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default countriesSlice.reducer;





const initialState = {
  countries: [],
  loading: false,
  error: null,
}

const countriesSlice = createSlice({  //ავტომატურად იქმნება reducer და action-ები, რომლებიც გვჭირდება, რომ შევცვალოთ state. createSlice-ის ფუნქციას ვაძლევთ ობიექტს, რომელშიც ვწერთ slice-ის სახელს, საწყის მდგომარეობას და reducers-ებს, რომლებიც განსაზღვრავენ როგორ იცვლება state სხვადასხვა action-ების მიხედვით. extraReducers-ებში კი ვწერთ ჩვენი async thunk-ის სხვადასხვა სტეიჯებს (pending, fulfilled, rejected) და იმას, თუ როგორ უნდა შეიცვალოს state თითოეულ მათგანში.
  name: "countries",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCountries.pending, (state) => { //roca pendingzea, gaige misi tipi da amoige state initialState da gaxade loading true
      state.loading = true; 
    })
    .addCase(fetchCountries.fulfilled, (state, action) => {   //tu amoikitxa tipi, aviget chveni state da action, romelsac gvawvdis thunkAPI. chven qveynebshi chavweret payload, sadac iqneba ukve is qveynebis sia, romelic ragac endpointidan wamoviget
      state.loading = false;
      state.countries = action.payload;
      state.error = null;
    })
    .addCase(fetchCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
})


export default countriesSlice.reducer; //იგივეა რაც countriesReducer