import cogoToast from "@hasanm95/cogo-toast";
const { createSlice } = require("@reduxjs/toolkit");
import { HYDRATE } from "next-redux-wrapper";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    orders: [],
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    removeUser(state, action) {
      state.user = null;
    },

    setOrders(state, action) {
      state.orders = action.payload;
    },

    clearOrders(state, action) {
      state.orders = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    });
  },
});

export const { setUser, removeUser, setOrders, clearOrders } =
  authSlice.actions;
export default authSlice.reducer;
