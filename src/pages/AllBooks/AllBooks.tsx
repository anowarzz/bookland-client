import { useGetAllBooksQuery } from "../../redux/api/Book/bookAPI";
import BookCard from "./BookCard";

// Define the book type
interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

const AllBooks = () => {
  const { data, error, isLoading } = useGetAllBooksQuery(undefined);

  console.log("API Response:", { data, error, isLoading });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-lg text-gray-600">Loading books...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error Loading Books</h3>
          <p className="text-red-600 mt-1">
            {error && "data" in error
              ? `${error.status}: ${JSON.stringify(error.data)}`
              : "Failed to fetch books. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  const books = data?.data || data || []; // Handle different response structures

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Books</h1>
        <p className="text-gray-600">Browse our complete collection of books</p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No books found in the library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book: Book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
