import {createSlice, createAsyncThunk, isFulfilled, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface PizzaSliceState {
  pizzas: [],
  status: "loading" | "success" | "error"
}

type FetchPizzasSlice = {
  activeCategory: number;
  selectedSorting: {name: string, sortProperty: string}
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  // if you type your function argument here
  async (params: FetchPizzasSlice, thunkApi) => {
    const {activeCategory, selectedSorting} = params
    const {data} = await axios.get(`https://63dccccf2308e3e319edf3ff.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&sortBy=${selectedSorting.sortProperty.replace('+', '')}&order=${selectedSorting.sortProperty.includes('+') ? 'asc' : 'desc'}`);
    if (data.length === 0) {
      return thunkApi.rejectWithValue("No pizzas")
    }
    return thunkApi.fulfillWithValue(data)
  }
)


const initialState: PizzaSliceState = {
  pizzas: [],
  status: 'loading',
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, state => {
      state.status = 'loading'
      state.pizzas = []
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload
      state.status = 'success'
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error'
      state.pizzas = []
    })
  }
})

export const {setPizzas} = pizzasSlice.actions
export default pizzasSlice.reducer