import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FilterSliceState {
  activeCategory: number,
  selectedSorting: {
    name: string, sortProperty: string
  },
  currentPage: number,
}

const initialState: FilterSliceState = {
  activeCategory: 0,
  selectedSorting: {
    name: `алфавиту (a-я)`, sortProperty: '+title'
  },
  currentPage: 1,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload
    },
    setSelectingSorting(state, action) {
      state.selectedSorting = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.selectedSorting = action.payload.selectedSorting;
      state.activeCategory = Number(action.payload.activeCategory);
    }
  }
})

export const {setActiveCategory, setSelectingSorting, setCurrentPage, setFilters} = filterSlice.actions
export default filterSlice.reducer