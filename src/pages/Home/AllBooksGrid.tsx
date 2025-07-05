import type { IBook } from "@/types";
import { BookOpen } from "lucide-react";
import BookCard from "../../components/BookCard";
import { useGetAllBooksQuery } from "../../redux/api/Book/bookAPI";

const AllBooksGrid = () => {
  const { data, error, isLoading } = useGetAllBooksQuery(undefined);

  console.log("Response:", { data, error, isLoading });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-10 max-w-full">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Collection
            </h1>
            <p className="text-gray-600">Loading books data...</p>
          </div>
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-10 max-w-full">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Collection
            </h1>
          </div>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Books
            </h3>
            <p className="text-gray-500">
              {error && "data" in error && error.data
                ? (error.data as { message?: string })?.message ||
                  "Failed to fetch books. Please try again later."
                : "Failed to fetch books. Please try again later."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const books = data?.data || data || [];

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-10 max-w-full">
      <div className="mb-8 md:mb-12 text-center">
        <p className="text-gray-600">Browse our complete collection of books</p>
        <p className="text-sm text-gray-500 mt-2">
          Total Books: {books.length}
        </p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No books found in the library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {books.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooksGrid;
