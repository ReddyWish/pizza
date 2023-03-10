import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

type CartItem = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  type: number;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItem[]
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
      addItem(state, action) {
        const findItems = state.items.find(obj => obj.id === action.payload.id);
        if (findItems) {
          findItems.count++
        } else {
          state.items.push({
            ...action.payload,
            count: 1
          })
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price * obj.count) + sum
        }, 0)
      },

      minusItem(state, action) {
        console.log(action.payload)
        let findItems = state.items.find((obj) => obj.id === action.payload)
        if (findItems) {
          findItems.count = findItems.count - 1
          state.totalPrice = state.items.reduce((sum, obj) => {
            return (obj.price * obj.count) + sum
          }, 0)
        }
      },
      removeItem(state, action) {
        state.items = state.items.filter(obj => obj.id !== action.payload);
        state.totalPrice = state.items.reduce((acc, obj) => {
          return (obj.price * obj.count) + acc
        }, 0)
      },
      clearItems(state) {
        state.items = [];
        state.totalPrice = 0
      }
    }
  }
)

export const selectCart = (state: RootState) => state.cartSlice

export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions
export default cartSlice.reducer