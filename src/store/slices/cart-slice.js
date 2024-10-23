import { v4 as uuidv4 } from "uuid";
import cogoToast from "@hasanm95/cogo-toast";
const { createSlice } = require("@reduxjs/toolkit");
import { HYDRATE } from "next-redux-wrapper";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    tempCartItem: {},
    totalAmount: 0,
  },
  reducers: {
    addToOwnCart(state, action) {
      const product = action.payload;
      if (product) {
        state.cartItems.push({
          ...product,
          cartItemId: uuidv4(),
        });

        state.tempCartItem = {};
        cogoToast.success("Added To Cart", { position: "bottom-left" });
      }
    },

    updateToOwnCart(state, action) {
      const product = action.payload;
      if (product.cartItemId) {
        const existingItem = state.cartItems.find(
          (item) => item.cartItemId === product.cartItemId
        );
        if (existingItem) {
          state.cartItems = state.cartItems.map((item) =>
            item.cartItemId === product.cartItemId
              ? { ...item, ...product }
              : item
          );
        }

        state.tempCartItem = {};
        cogoToast.success("Updated in Cart", { position: "bottom-left" });
      }
    },

    addToCart(state, action) {
      const product = action.payload;
      if (!product.variation) {
        const cartItem = state.cartItems.find((item) => item.id === product.id);
        if (!cartItem) {
          state.cartItems.push({
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuidv4(),
          });
        } else {
          state.cartItems = state.cartItems.map((item) => {
            if (item.cartItemId === cartItem.cartItemId) {
              return {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
              };
            }
            return item;
          });
        }
      } else {
        const cartItem = state.cartItems.find(
          (item) =>
            item.id === product.id &&
            product.selectedProductColor &&
            product.selectedProductColor === item.selectedProductColor &&
            product.selectedProductSize &&
            product.selectedProductSize === item.selectedProductSize &&
            (product.cartItemId ? product.cartItemId === item.cartItemId : true)
        );
        if (!cartItem) {
          state.cartItems.push({
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuidv4(),
          });
        } else if (
          cartItem !== undefined &&
          (cartItem.selectedProductColor !== product.selectedProductColor ||
            cartItem.selectedProductSize !== product.selectedProductSize)
        ) {
          state.cartItems = [
            ...state.cartItems,
            {
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuidv4(),
            },
          ];
        } else {
          state.cartItems = state.cartItems.map((item) => {
            if (item.cartItemId === cartItem.cartItemId) {
              return {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
                selectedProductColor: product.selectedProductColor,
                selectedProductSize: product.selectedProductSize,
              };
            }
            return item;
          });
        }
      }

      state.tempCartItem = {};
      cogoToast.success("Added To Cart", { position: "bottom-left" });
    },

    deleteFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.cartItemId !== action.payload
      );
      cogoToast.error("Removed From Cart", { position: "bottom-left" });
    },

    decreaseQuantity(state, action) {
      const product = action.payload;
      if (product.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.cartItemId !== product.cartItemId
        );
        cogoToast.error("Removed From Cart", { position: "bottom-left" });
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        cogoToast.warn("Item Decremented From Cart", {
          position: "bottom-left",
        });
      }
    },

    increaseQuantity(state, action) {
      const product = action.payload;

      state.cartItems = state.cartItems.map((item) =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      cogoToast.success("Item Incremented From Cart", {
        position: "bottom-left",
      });
    },

    deleteAllFromCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
    },

    addTempCartItem(state, action) {
      state.tempCartItem = action.payload;
    },

    deleteFromTempCart(state) {
      state.tempCartItem = {};
    },

    setTempCartQty(state, action) {
      state.tempCartItem.quantity = action.payload;
    },

    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.cartItems,
        ...action.payload.tempCartItem,
        ...action.payload.totalAmount,
      };
    });
  },
});

export const {
  addToCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
  deleteAllFromCart,
  addToOwnCart,
  updateToOwnCart,
  addTempCartItem,
  deleteFromTempCart,
  setTempCartQty,
  setTotalAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
