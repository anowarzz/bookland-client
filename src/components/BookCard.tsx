import BorrowModal from "@/components/BorrowModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import EditBookModal from "@/components/EditBookModal";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/Book/bookAPI";
import type { BookProps } from "@/types";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const BookCard = ({ book }: BookProps) => {
  const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook(bookId).unwrap();
      console.log("Book deleted successfully");
      toast.success("Book deleted successfully", {
        className: "toast-success",
      });
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete book:", err);
      toast.error("Failed to delete book", {
        className: "toast-error",
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow min-h-[320px] md:min-h-[360px] flex flex-col">
      {/* Image placeholder area - book cover shape */}
      <div className="mb-3 h-40 md:h-48 bg-gray-100 rounded-md flex items-center justify-center">
        <BookOpen className="h-8 w-8 text-gray-400" />
      </div>

      {/* Title and Availability */}
      <div className="mb-3">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
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
      <div className="space-y-1 mb-3 text-xs md:text-sm flex-grow">
        <p className="text-gray-600 truncate">
          <span className="font-medium">Author:</span> {book.author}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-gray-100 mt-auto">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
          {/* Mobile Layout - First row */}
          <div className="flex items-center justify-between md:contents">
            <Button
              variant="outline"
              size="sm"
              className="text-xs px-3 py-1 h-7 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 md:flex-none md:w-20"
              onClick={() => navigate(`/books/${book._id}`)}
            >
              Details
            </Button>

            {/* Edit and Delete Icons - Mobile */}
            <div className="flex gap-3 md:hidden">
              <EditBookModal
                book={book}
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
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
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={() => handleDeleteBook(book._id as string)}
                title="Book"
                description={`Are you sure you want to delete "${book.title}"?`}
                isLoading={deleteLoading}
              />
            </div>

            {/* Desktop Action Icons */}
            <div className="hidden md:flex gap-1 flex-1 justify-end">
              <EditBookModal
                book={book}
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-gray-800 text-white hover:bg-gray-900 border-gray-800 hover:text-white"
                  >
                    <Edit size={14} />
                  </Button>
                }
              />

              <DeleteConfirmationModal
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                  >
                    <Trash2 size={14} />
                  </Button>
                }
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={() => handleDeleteBook(book._id as string)}
                title="Book"
                description={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
                isLoading={deleteLoading}
              />

              <BorrowModal
                isOpen={isBorrowDialogOpen}
                onOpenChange={setIsBorrowDialogOpen}
                bookTitle={book.title}
                maxCopies={book.copies}
                bookId={book._id}
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 px-2 flex items-center gap-1 ${
                      book.available
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                        : "bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed"
                    }`}
                    disabled={!book.available}
                  >
                    <BookOpen size={12} />
                    <span className="text-xs">Borrow</span>
                  </Button>
                }
              />
            </div>
          </div>

          {/* Mobile - Second row - Borrow button */}
          <BorrowModal
            isOpen={isBorrowDialogOpen}
            onOpenChange={setIsBorrowDialogOpen}
            bookTitle={book.title}
            maxCopies={book.copies}
            bookId={book._id}
            trigger={
              <Button
                variant="outline"
                size="sm"
                className={`w-full h-7 px-3 py-1 text-xs flex items-center justify-center gap-1 md:hidden ${
                  book.available
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                    : "bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed"
                }`}
                disabled={!book.available}
              >
                <BookOpen size={12} />
                <span>Borrow</span>
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
