import { Button } from "@/components/ui/button";
import type { BookProps } from "@/types";
import { useState } from "react";

const BookCard = ({ book }: BookProps) => {
  const [showActions, setShowActions] = useState(false);

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
        {!showActions ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
            >
              Details
            </Button>
            <Button
              onClick={() => setShowActions(true)}
              variant="secondary"
              size="sm"
              className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
            >
              Actions
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 min-w-0 bg-gray-800 text-white hover:bg-gray-900 border  border-gray-800"
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1 min-w-0 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
              >
                Delete
              </Button>
              <Button
                variant={book.available ? "default" : "ghost"}
                size="sm"
                className={`flex-1 min-w-0 ${
                  book.available
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
                disabled={!book.available && book.copies === 0}
              >
                {book.available ? "Borrow" : "Return"}
              </Button>
            </div>
            <Button
              onClick={() => setShowActions(false)}
              variant="outline"
              size="sm"
              className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
