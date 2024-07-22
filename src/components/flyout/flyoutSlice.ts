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
  },
});

const { actions, reducer } = selectedItemsSlice;

export const { itemAdded } = actions;
export default reducer;
