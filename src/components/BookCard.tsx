import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/Book/bookAPI";
import type { BookProps } from "@/types";
import { BookOpen, Edit, Loader2, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

const BookCard = ({ book }: BookProps) => {
  const [deleteBook, { isError: deleteError, isLoading: deleteLoading }] =
    useDeleteBookMutation();

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
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {book.title}
        </h3>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            book.available
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {book.available ? "Available" : "Unavailable"}
        </span>
      </div>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Author:</span> {book.author}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-medium">Genre:</span> {book.genre}
      </p>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-none w-20 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
          >
            Details
          </Button>

          {/* Action Icons */}
          <div className="flex gap-1 flex-1 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-gray-800 text-white hover:bg-gray-900 border-gray-800 hover:text-white"
            >
              <Edit size={14} />
            </Button>
            <Button
              onClick={() => handleDeleteBook(book._id as string)}
              disabled={deleteLoading}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-red-50 text-red-700 hover:bg-red-100 border-red-200 disabled:opacity-50"
            >
              {deleteLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 px-2 flex items-center gap-1 ${
                book.available
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
              }`}
              disabled={!book.available && book.copies === 0}
            >
              {book.available ? (
                <>
                  <BookOpen size={12} />
                  <span className="text-xs">Borrow</span>
                </>
              ) : (
                <>
                  <RotateCcw size={12} />
                  <span className="text-xs">Return</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
