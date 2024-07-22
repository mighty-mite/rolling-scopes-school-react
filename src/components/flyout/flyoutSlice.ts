import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICard, SelectedItemsState } from "@/types";

const initialState: SelectedItemsState = {
  selected: [],
};

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    itemAdded: (state, action: PayloadAction<ICard>) => {
      state.selected.push(action.payload);
    },
    itemRemoved: (state, action: PayloadAction<number>) => {
      state.selected = state.selected.filter(
        item => item.id !== action.payload
      );
    },
    unselectAll: state => {
      state.selected = [];
    },
  },
});

const { actions, reducer } = selectedItemsSlice;

export const { itemAdded, itemRemoved, unselectAll } = actions;
export default reducer;
