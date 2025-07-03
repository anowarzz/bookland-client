import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import EditBookModal from "@/components/EditBookModal";
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
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface BookTableProps {
  books: IBook[];
}

const BookTable = ({ books }: BookTableProps) => {
  const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();
  const [deleteDialogBook, setDeleteDialogBook] = useState<string | null>(null);
  const [editDialogBook, setEditDialogBook] = useState<string | null>(null);
  const navigate = useNavigate();

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
        <div className="grid grid-cols-2 gap-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow min-h-[320px] flex flex-col"
            >
              {/* Image placeholder area - book cover shape */}
              <div className="mb-3 h-40 bg-gray-100 rounded-md flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>

              {/* Title and Availability */}
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
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
              <div className="space-y-1 mb-3 text-xs flex-grow">
                <p className="text-gray-600 truncate">
                  <span className="font-medium">Author:</span> {book.author}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 mt-auto">
                <div className="flex flex-col gap-2">
                  {/* First row - Details and Icons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs px-3 py-1 h-7 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                      onClick={() => navigate(`/books/${book._id}`)}
                    >
                      Details
                    </Button>

                    {/* Edit and Delete Icons */}
                    <div className="flex gap-2">
                      <EditBookModal
                        book={book}
                        isOpen={editDialogBook === book._id}
                        onOpenChange={(open) =>
                          setEditDialogBook(open ? (book._id as string) : null)
                        }
                        trigger={
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 bg-gray-800 text-white hover:bg-gray-900 border-gray-800 hover:text-white"
                          >
                            <Edit size={12} />
                          </Button>
                        }
                      />

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
                        description={`Are you sure you want to delete "${book.title}"?`}
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
                    disabled={!book.available}
                  >
                    <>
                      <BookOpen size={12} />
                      <span>Borrow</span>
                    </>
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
              <TableHead>Cover</TableHead>
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
                <TableCell className="py-4">
                  <div className="w-12 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                  </div>
                </TableCell>
                <TableCell className="py-4 font-medium">{book.title}</TableCell>
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
                      className="h-6 px-3 cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                      onClick={() => navigate(`/books/${book._id}`)}
                    >
                      Details
                    </Button>
                    <EditBookModal
                      book={book}
                      isOpen={editDialogBook === book._id}
                      onOpenChange={(open) =>
                        setEditDialogBook(open ? (book._id as string) : null)
                      }
                      trigger={
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-3 cursor-pointer bg-gray-900 hover:text-gray-200  text-white hover:bg-gray-800 border border-gray-700"
                        >
                          Edit
                        </Button>
                      }
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className={`h-6 px-3 ${
                        book.available
                          ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 cursor-pointer"
                          : "bg-gray-50 text-gray-500 border border-gray-200 cursor-not-allowed"
                      }`}
                      disabled={!book.available}
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
