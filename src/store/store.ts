import { configureStore } from "@reduxjs/toolkit";

import { cardListSlice } from "@/components/cardlist/cardListSlice";

export const store = configureStore({
  reducer: {
    [cardListSlice.reducerPath]: cardListSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(cardListSlice.middleware);
  },
});
