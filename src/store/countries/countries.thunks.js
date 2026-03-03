// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

// // Create async thunk for fetching countries
// export const fetchCountries = createAsyncThunk(
//   "countries/fetchCountries",
//   async (_, thunkAPI) => {
//     try {
//       const res = await fetch(
//         "https://restcountries.com/v3.1/all?fields=name,flags,cca2"
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   countries: [],
//   loading: false,
//   error: null,
// };

// const countriesSlice = createSlice({
//   name: "countries",
//   initialState,
//   reducers: {
//     // You can add synchronous reducers here if needed
//     clearCountries: (state) => {
//       state.countries = [];
//       state.error = null;
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

// export const { clearCountries } = countriesSlice.actions;
// export const countriesReducer = countriesSlice.reducer;
// export default countriesSlice.reducer;

// export const fetchCountries = createAsyncThunk(
//     "countries/fetchCountries",
//     async (_, thunkAPI) => {
//         try {
//             console.log("dispatching, inside fetchCountries thunk");
//             const res = await fetch(

//                 "https://restcountries.com/v3.1/all?fields=name,flags,cca2,population,region,capital,area,currency,languages,timezones,subregion");

//             if(!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             console.log("response is okay");
//             const data = await res.json();
//            if(data) {console.log("Fetched countries data:", data);
//             return thunkAPI.fulfillWithValue(data);
//            }
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// )

// export const fetchCountries = createAsyncThunk(
//   "countries/fetchCountries",
//   async (_, thunkAPI) => {
//     try {
//       // Option 1: Try minimal fields first
//       const url =
//         "https://restcountries.com/v3.1/all?fields=name,flags,cca2,population,region,capital,currencies,languages,subregion,area";

//       // Option 2: Or try without any fields filter
//       // const url = "https://restcountries.com/v3.1/all";

//       const res = await fetch(url);

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }

//       const data = await res.json();

//       // Check what fields are actually in the data
//       if (data.length > 0) {
//         console.log("First country keys:", Object.keys(data[0]));
//         console.log("First country continents:", data[0].continents);
//       }

//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const fetchCountries = createAsyncThunk(
  "/countries/GET",
  async (_, ThunkAPI) => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,cca2,population,region,capital,currencies,languages,subregion,area",
      );

      const data = await res.json();
      if (data)  return ThunkAPI.fulfillWithValue(data);
    } catch (error) {
      return ThunkAPI.rejectWithValue("something went wrong");
     
    }
  },
);
