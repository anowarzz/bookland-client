import type { BookProps } from "@/types";

const BookCard = ({ book }: BookProps) => {
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
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Genre:</span> {book.genre}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">ISBN:</span> {book.isbn}
      </p>
      <p className="text-gray-600 mb-3">
        <span className="font-medium">Copies:</span> {book.copies}
      </p>
      <p className="text-gray-500 text-sm line-clamp-3">{book.description}</p>
    </div>
  );
};

export default BookCard;
