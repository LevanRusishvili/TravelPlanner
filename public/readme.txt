qveynebis wamosagebad, gamoviyenot countries.thunks.js file. 

1.shevqmnat thunk --> createAsyncThunk

2.parametrad unda gadavcet ragac gasagebi, ./countries/GET
3.gadavcet parametrad callback function. (payload, ThunkAPI ) => {}
ThunkAPI sashualebas gvadzlevs davabrunot payloadi.
am shemtxvevashi payloads arafers ar gadavcemt UI s mxridan, imitom rom GET operaciaa da
mxolod monacemebis wamogeba gvinda API dan, amitom shegvidzlia davsvat '_', rac nishnavs rom payload ar gvaqvs

const getCountries = createAsyncThunk (
    '/countries/GET',
    async (_, ThunkAPI) => {

    }
)

4. rogorc chveulebrivi API callis dros, gamoviyenot try catch blocki

const getCountries = createAsyncThunk (
    '/countries/GET',
    async (_, ThunkAPI) => {
try {
const res = await fetch(""https://restcountries.com/v3.1/all?fields=name,flags,cca2,population,region,capital,currencies,languages,subregion,area"",);

const data = await res.json():

if(data) return ThunkAPI.fullfilledWithValue(data);
} catch(err) {
    return ThunkAPI.rejectedWithValue("something went wrong");
}
    }
)

დასკვნა:
fetchCountries() იძახებს async ფუნქციას
ხდება GET მოთხოვნა API-ზე
პასუხი გარდაიქმნება JSON-ად
თუ წარმატებულია: ThunkAPI.fulfillWithValue(data) - აბრუნებს წარმატებულ შედეგს
თუ შეცდომაა: ThunkAPI.rejectWithValue("something went wrong") - აბრუნებს შეცდომას



exla mtavar sliceshi shevqmnat state
1.
const initialState = {
  countries: [],    aq mivigebt chven wamogebul informacias da chavwert shignit 
  loading: false,    
  error: null,
}

2. shevqmnat slice 

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {}.
    
    3. 
    ეს რედიუსერი არის ასინქრონული კოდისთვის. სანამ Thunk fulfill  ს გააკეთებს, ანუ მიიღებს data-ს არის pending პროცესში. როდესაც რექვესთს გავგზავნით.
    ამ დროს შევცვალოთ loading true -თი
    extraReducers: (builder) => {
        builder.addCase(fetchCountries.pending, (state) => {
            state.loading = true.
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




es yvelaferi gamovitanot plantripPage-ში

მონაცემები რომ წამოვიღოთ, დავწეროთ useEffect, რომელსაც უნდა გადავცეთ dependency array, შიგნით რასაც ჩავწერთ,
იმის სთეითის ცვლილების დროს შესრულდება ის, რაც useEffect ში წერია.
თუ useEffect - ს გადავეცით ცარიელი მასივი, ან ისეთი სთეითი, რომელიც უცვლელია, მაშინ შიგნით არსებული კოდი გაეშვება, როცა კომპონენტი mounting-ის ფაზაშია.
useEffect(() => {
    dispatch(fetchCountries())
}, []) 

1.იტვირთება კომპონენტი.(mounting)
2. useEffect გამოიძახება
3.იძახება fetchCountries();
4.მოქმედება იგზავნება redux store-ში.
5.redux middleware(redux thunk) ამუშავებს ასინქრონულ მოთხოვნას
6.როცა მონაცემები მოდის, redux state იხსნება ახალი მონაცემებით
მთავარ Store-ში გვაქვს დარეგისტრირებული 
const rootReducer = combineReducers({
  header: headerReducer,
  countries: countriesReducer, // ← აქ იცვლება countries-ის state
  trip: tripReducer,
});
 
 საწყის ეტაპზე ეს ობიექტი არის ასეთი {
  countries: {
    countries: [],
    loading: false,
    error: null
  }
}

pending-ის დროს იცვლება loading-true -თი დანარჩენი იგივეა.
fulfilled ის დროს countries მასივი შეივსება api დან მიღებული მონაცემებით.
7. კომპონენტი თავიდან გამოიძახება(re-render) ახალი მონაცემებით
როცა Redux store იცვლება, ყველა კომპონენტი რომელიც იყენებს useSelector-ს იღებს ახალ state-ს:
const { countries, loading, error } = useSelector(state => state.countries);
// თავდაპირველად:
// countries = [], loading = false, error = null

// pending-ის დროს:
// countries = [], loading = true, error = null

// fulfilled-ის დროს:
// countries = [მონაცემები...], loading = false, error = null










1. კომპონენტი MOUNT ⬇
2. useEffect გაეშვება ⬇
3. dispatch(fetchCountries()) ⬇
4. fetchCountries.pending მოქმედება ⬇
   → state.loading = true ⬇
5. fetch() API მოთხოვნა ⬇
6. API პასუხობს ⬇
7. fetchCountries.fulfilled ან .rejected ⬇
8. Store იხსნება ⬇
9. useSelector აღმოაჩენს ცვლილებას ⬇
10. კომპონენტი RE-RENDER ⬇
11. UI განახლდება ახალი მონაცემებით/დატვირთვის ინდიკატორით











1. კომპონენტი იტვირთება
   ↓
2. dispatch(fetchCountries()) იძახება
   ↓
3. store.countries.loading ხდება true
   ↓
4. fetch() მიდის API-ზე
   ↓
5. API პასუხობს მონაცემებით
   ↓  
6. store.countries.loading ხდება false
   ↓
7. store.countries.countries ივსება მონაცემებით
   ↓
8. კომპონენტი ავტომატურად განახლდება ახალი მონაცემებით







