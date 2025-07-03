import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteBookMutation } from "@/redux/api/Book/bookAPI";
import type { IBook } from "@/types";
import { toast } from "sonner";

interface BookTableProps {
  books: IBook[];
}

const BookTable = ({ books }: BookTableProps) => {


  const [deleteBook, { isError: deleteError, isLoading: deleteLoading }] =
    useDeleteBookMutation();

  console.log("Response:", { data, error, isLoading });

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook(bookId).unwrap();
      console.log("Book deleted successfully");
      toast.success("Book deleted successfully");
    } catch (err) {
      console.error("Failed to delete book:", err);
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Mobile Card Layout */}
      <div className="block md:hidden">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">
                    {book.author}
                  </p>
                </div>
                <span
                  className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium ml-2 sm:ml-3 flex-shrink-0 ${
                    book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Not Available"}
                </span>
              </div>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm mb-3 sm:mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Genre:</span>
                  <span className="text-gray-700 truncate ml-1 sm:ml-2">
                    {book.genre}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Copies:</span>
                  <span className="text-gray-700 font-semibold">
                    {book.copies}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">ISBN:</span>
                  <span className="text-gray-700 truncate ml-1 sm:ml-2 text-xs">
                    {book.isbn}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2 pt-2">
                <div className="flex gap-1.5 sm:gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm cursor-pointer bg-gray-900 text-white hover:bg-gray-800 hover:text-white border border-gray-700"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                  >
                    Borrow
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  className="w-full h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm cursor-pointer bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id} className="border-b border-gray-100">
                <TableCell className="py-4">{book.title}</TableCell>
                <TableCell className="py-4">{book.author}</TableCell>
                <TableCell className="py-4">{book.genre}</TableCell>
                <TableCell className="py-4">{book.isbn}</TableCell>
                <TableCell className="py-4">{book.copies}</TableCell>
                <TableCell className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.available ? "Available" : "Not Available"}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex gap-2 lg:gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-3 cursor-pointer bg-gray-900 hover:text-gray-200  text-white hover:bg-gray-800 border border-gray-700"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="h-6 px-3 cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                    >
                      Borrow
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-6 px-3 cursor-pointer bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookTable;
