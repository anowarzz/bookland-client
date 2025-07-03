import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
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
import { BookOpen, Edit, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BookTableProps {
  books: IBook[];
}

const BookTable = ({ books }: BookTableProps) => {
  const [deleteBook, { isLoading: deleteLoading }] =
    useDeleteBookMutation();
  const [deleteDialogBook, setDeleteDialogBook] = useState<string | null>(null);

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook(bookId).unwrap();
      console.log("Book deleted successfully");
      toast.success("Book deleted successfully");
      setDeleteDialogBook(null);
    } catch (err) {
      console.error("Failed to delete book:", err);
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="container mx-auto px-2 py-4 max-w-full">
      {/* Mobile Card Layout */}
      <div className="block md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              {/* Title and Availability */}
              <div className="mb-3">
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                  {book.title}
                </h3>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Unavailable"}
                </span>
              </div>

              {/* Book Details */}
              <div className="space-y-1 mb-3 text-sm">
                <p className="text-gray-600 truncate">
                  <span className="font-medium">Author:</span> {book.author}
                </p>
                <p className="text-gray-600 truncate">
                  <span className="font-medium">Genre:</span> {book.genre}
                </p>
                <p className="text-gray-600 truncate">
                  <span className="font-medium">ISBN:</span> {book.isbn}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Copies:</span> {book.copies}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex flex-col gap-2">
                  {/* First row - Details and Icons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm px-3 py-1 h-7 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                    >
                      Details
                    </Button>

                    {/* Edit and Delete Icons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 bg-gray-800 text-white hover:bg-gray-900 border-gray-800 hover:text-white"
                      >
                        <Edit size={12} />
                      </Button>

                      <DeleteConfirmationModal
                        trigger={
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                          >
                            <Trash2 size={12} />
                          </Button>
                        }
                        isOpen={deleteDialogBook === book._id}
                        onOpenChange={(open) =>
                          setDeleteDialogBook(
                            open ? (book._id as string) : null
                          )
                        }
                        onConfirm={() => handleDeleteBook(book._id as string)}
                        title="Book"
                        description={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
                        isLoading={deleteLoading}
                      />
                    </div>
                  </div>

                  {/* Second row - Borrow/Return button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full h-7 px-3 py-1 text-sm flex items-center justify-center gap-1 ${
                      book.available
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
                    }`}
                    disabled={!book.available && book.copies === 0}
                  >
                    {book.available ? (
                      <>
                        <BookOpen size={12} />
                        <span>Borrow</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw size={12} />
                        <span>Return</span>
                      </>
                    )}
                  </Button>
                </div>
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
                    <DeleteConfirmationModal
                      trigger={
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-6 px-3 cursor-pointer bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                        >
                          Delete
                        </Button>
                      }
                      isOpen={deleteDialogBook === book._id}
                      onOpenChange={(open) =>
                        setDeleteDialogBook(open ? (book._id as string) : null)
                      }
                      onConfirm={() => handleDeleteBook(book._id as string)}
                      title="Book"
                      description={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
                      isLoading={deleteLoading}
                    />
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
