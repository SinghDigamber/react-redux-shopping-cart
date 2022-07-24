import { createSlice } from '@reduxjs/toolkit'

const useCartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalCount: 0,
    tax: 0,
    subAmount: 0,
    totalAmount: 0,
  },
  reducers: {
    addCartProduct: {
      reducer: (state, action) => {
        let cartIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id,
        )
        if (cartIndex >= 0) {
          state.cartItems[cartIndex].quantity += 1
        } else {
          let tempProduct = { ...action.payload, quantity: 1 }
          state.cartItems.push(tempProduct)
        }
      },
    },
    getCartProducts: (state, action) => {
      return {
        ...state,
      }
    },
    getCartCount: (state, action) => {
      let cartCount = state.cartItems.reduce((total, item) => {
        return item.quantity + total
      }, 0)
      state.totalCount = cartCount
    },
    getSubTotal: (state, action) => {
      state.subAmount = state.cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
    },
    removeCartItem: (state, action) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload,
      )
      if (index !== -1) {
        state.cartItems.splice(index, 1)
      }
    },
    increment: (state, action) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload,
      )
      state.cartItems[index].quantity += 1
    },
    decrement: (state, action) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload,
      )
      if (state.cartItems[index].quantity <= 0) {
        state.cartItems[index].quantity = 0
      } else {
        state.cartItems[index].quantity -= 1
      }
    },
    calculateTax: (state, action) => {
      // GST value: 18% => action.payload
      let totalTax = (18 / 100) * state.subAmount
      state.tax = totalTax
    },
    getTotalAmount: (state, action) => {
      state.totalAmount = state.tax + state.subAmount
    },
  },
})

export const {
  addCartProduct,
  getCartProducts,
  removeCartItem,
  getCartCount,
  getSubTotal,
  increment,
  decrement,
  calculateTax,
  getTotalAmount,
} = useCartSlice.actions

export default useCartSlice.reducer
