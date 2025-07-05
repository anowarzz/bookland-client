import { BookOpen } from "lucide-react";
import { useGetAllBooksQuery } from "../../redux/api/Book/bookAPI";
import BookTable from "./BookTable";

const AllBooks = () => {
  const { data, error, isLoading } = useGetAllBooksQuery(undefined);
  const books = data?.data || data || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Books</h1>
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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Books</h1>
          </div>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Books
            </h3>
            <p className="text-gray-500 mb-4">
              {error && "data" in error
                ? `${error.status}: ${JSON.stringify(error.data)}`
                : "Failed to fetch books. Please try again later."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Books</h1>
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
        <BookTable books={books} />
      )}
    </div>
  );
};

export default AllBooks;
