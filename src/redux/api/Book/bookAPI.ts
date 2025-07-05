import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookland-server.vercel.app/api",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books?limit=20&sort=-createdAt",
      providesTags: ["Book"],
    }),

    getBookById: builder.query({
      query: (bookId) => `/books/${bookId}`,
      providesTags: (_result, _error, bookId) => [{ type: "Book", id: bookId }],
    }),

    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ bookId, bookData }) => ({
        url: `/books/${bookId}`,
        method: "PATCH",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
