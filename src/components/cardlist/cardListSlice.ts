import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cardListSlice = createApi({
  reducerPath: "cardList",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
  endpoints: builder => ({
    getCards: builder.query({
      query: ({ searchQuery, offset }) =>
        `/search?q=${searchQuery}&limit=10&skip=${offset}`,
    }),
  }),
});

export const { useGetCardsQuery } = cardListSlice;
