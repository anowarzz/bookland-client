import type { IBook } from "@/types";
import BookCard from "../../components/BookCard";
import { useGetAllBooksQuery } from "../../redux/api/Book/bookAPI";

const AllBooksGrid = () => {
  const { data, error, isLoading } = useGetAllBooksQuery(undefined);

  console.log("Response:", { data, error, isLoading });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-10 max-w-full">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-lg text-gray-600">Loading books...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-10 max-w-full">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error Loading Books</h3>
          <p className="text-red-600 mt-1">
            {error && "data" in error && error.data
              ? ((error.data as { message?: string })?.message ||
                "Failed to fetch books. Please try again later.")
              : "Failed to fetch books. Please try again later."}
          </p>
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
