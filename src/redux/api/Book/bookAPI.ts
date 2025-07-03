import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookland-server.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books?limit=20&sort=-createdAt",
    }),

    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
    }),
  }),
});

export const { useGetAllBooksQuery, useAddBookMutation } = bookApi;
