import BorrowModal from "@/components/BorrowModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import EditBookModal from "@/components/EditBookModal";
import { Button } from "@/components/ui/button";
import {
  useDeleteBookMutation,
  useGetBookByIdQuery,
} from "@/redux/api/Book/bookAPI";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  Copy,
  Edit,
  FileText,
  Hash,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const BookDetails = () => {

  
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: response, error, isLoading } = useGetBookByIdQuery(bookId);
  const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const book = response?.data || response;


  const handleDeleteBook = async () => {
    try {
      await deleteBook(book._id).unwrap();
      toast.success("Book deleted successfully", {
        description: `"${book.title}" has been deleted from your library`,
        className: "toast-success",
        duration: 3000,
        action: {
          label: "Hide",
          onClick: () => console.log("Book deleted"),
        },
      });
      navigate("/all-books");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book", {
        description: "Please try again later.",
        className: "toast-error",
        duration: 3000,
        action: {
          label: "Hide",
          onClick: () => console.log("Error deleting book"),
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Book Details</h1>
            <p className="text-gray-600 mt-1">Loading book details...</p>
          </div>
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="h-6 w-6 text-red-600" />
            <h3 className="text-red-800 font-semibold">Book Not Found</h3>
          </div>
          <p className="text-red-600 mb-4">
            The book you're looking for could not be found or an error occurred
            while loading.
          </p>
          <Button
            onClick={() => navigate("/all-books")}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Books
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          onClick={() => navigate("/all-books")}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Books
        </Button>
      </div>

      {/* Book Details Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Book Cover Placeholder */}
          <div className="md:w-1/3 lg:w-1/4 bg-gray-100 flex items-center justify-center p-8">
            <div className="text-center">
              <BookOpen className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Book Cover</p>
            </div>
          </div>

          {/* Book Information */}
          <div className="md:w-2/3 lg:w-3/4 p-6 md:p-8">
            {/* Title and Availability */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {book.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? (
                    <>
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      Available
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 inline mr-1" />
                      Not Available
                    </>
                  )}
                </span>
                <span className="text-gray-600 text-sm">
                  {book.copies} {book.copies === 1 ? "copy" : "copies"}{" "}
                  available
                </span>
              </div>
            </div>

            {/* Book Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Author</p>
                    <p className="text-gray-900">{book.author}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Hash className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">ISBN</p>
                    <p className="text-gray-900 font-mono">{book.isbn}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Genre</p>
                    <p className="text-gray-900">
                      {book.genre?.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Copy className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Total Copies
                    </p>
                    <p className="text-gray-900">{book.copies}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div className="mb-8">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Description
                    </p>
                    <p className="text-gray-900 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Timestamps */}
            {(book.createdAt || book.updatedAt) && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {book.createdAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Added: </span>
                      <span className="text-gray-900">
                        {new Date(book.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {book.updatedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Updated: </span>
                      <span className="text-gray-900">
                        {new Date(book.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {/* Primary Action - Borrow Book */}
              <BorrowModal
                isOpen={isBorrowModalOpen}
                onOpenChange={setIsBorrowModalOpen}
                bookTitle={book.title}
                maxCopies={book.copies}
                bookId={book._id}
                trigger={
                  <Button
                    disabled={!book.available || book.copies === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    {book.available ? "Borrow Book" : "Not Available"}
                  </Button>
                }
              />

              {/* Secondary Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <EditBookModal
                  book={book}
                  isOpen={isEditModalOpen}
                  onOpenChange={setIsEditModalOpen}
                  trigger={
                    <Button
                      variant="outline"
                      className="flex-1 h-11 border-gray-300 hover:border-gray-400"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Book
                    </Button>
                  }
                />

                <DeleteConfirmationModal
                  trigger={
                    <Button
                      variant="destructive"
                      className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Book
                    </Button>
                  }
                  isOpen={isDeleteModalOpen}
                  onOpenChange={setIsDeleteModalOpen}
                  onConfirm={handleDeleteBook}
                  title="Book"
                  description={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
                  isLoading={deleteLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
