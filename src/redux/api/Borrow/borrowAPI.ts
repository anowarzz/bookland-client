import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookland-server.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/borrow",
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApi;
