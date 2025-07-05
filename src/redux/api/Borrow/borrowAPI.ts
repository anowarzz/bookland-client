import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookland-server.vercel.app/api",
  }),
  tagTypes: ["Borrow"],
  endpoints: (builder) => ({
    borrowSummary: builder.query({
      query: () => "/borrow-summary",
      providesTags: ["Borrow"],
    }),

    createBorrow: builder.mutation({
      query: ({ bookId, quantity, dueDate }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body: { quantity, dueDate },
      }),
      invalidatesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowSummaryQuery, useCreateBorrowMutation } = borrowApi;
