import { configureStore } from "@reduxjs/toolkit";

import { cardListSlice } from "@/components/cardlist/cardListSlice";

import flyout from "./../components/flyout/flyoutSlice";

export const store = configureStore({
  reducer: {
    [cardListSlice.reducerPath]: cardListSlice.reducer,
    flyout,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(cardListSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
