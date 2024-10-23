const { createSlice } = require("@reduxjs/toolkit");
import { HYDRATE } from "next-redux-wrapper";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    counterTops: [],
    storages: {
      arabic_storages: [],
      english_storages: [],
    },
    colors: {},
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setCounterTops(state, action) {
      state.counterTops = action.payload;
    },
    setStorages(state, action) {
      if (
        state.storages.arabic_storages.find((item) => item.storage_id === "no")
      ) {
        state.storages.arabic_storages = state.storages.arabic_storages.filter(
          (item) => item.storage_id === "no"
        );
        state.storages.arabic_storages = [
          ...state.storages.arabic_storages,
          ...action.payload.arabic_storages,
        ];
      }
      
      if (
        state.storages.english_storages.find((item) => item.storage_id === "no")
      ) {
        state.storages.english_storages =
          state.storages.english_storages.filter(
            (item) => item.storage_id === "no"
          );
        state.storages.english_storages = [
          ...state.storages.english_storages,
          ...action.payload.english_storages,
        ];
      } else {
        state.storages = action.payload;
      }
    },
    setColors(state, action) {
      state.colors = action.payload;
    },
    addNoStorage(state, action) {
      state.storages = {
        arabic_storages: [
          {
            storage_id: "no",
            storage_name: "لا توجد مساحة تخزين",
            storage_main_image: action.payload,
            storage_sub_image: "uploads/no-storage.png",
          },
        ],
        english_storages: [
          {
            storage_id: "no",
            storage_name: "No Storage",
            storage_main_image: action.payload,
            storage_sub_image: "uploads/no-storage.png",
          },
        ],
      };
    },
    removeNoStorage(state) {
      state.storages = {
        arabic_storages: [],
        english_storages: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.products,
        ...action.payload.counterTops,
        ...action.payload.storages,
        ...action.payload.colors,
      };
    });
  },
});

export const {
  setProducts,
  setCounterTops,
  setStorages,
  setColors,
  removeNoStorage,
  addNoStorage,
} = productSlice.actions;
export default productSlice.reducer;
