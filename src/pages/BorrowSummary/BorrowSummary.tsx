import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBorrowSummaryQuery } from "@/redux/api/Borrow/borrowAPI";
import type { IBorrowSummary } from "@/types";
import { BookOpen } from "lucide-react";

const BorrowSummary = () => {
  const { data: borrowSummary, isLoading, error } = useBorrowSummaryQuery({});

  console.log(borrowSummary);

  const borrowSummaryData: IBorrowSummary[] = borrowSummary?.data || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 sm:p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Borrow Summary</h1>
            <p className="text-gray-600 mt-1">Loading borrowed books data...</p>
          </div>
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 sm:p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Borrow Summary</h1>
          </div>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Data
            </h3>
            <p className="text-gray-500">
              Unable to load borrow summary. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (borrowSummaryData.length === 0) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 sm:p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Borrow Summary
            </h1>
            <p className="text-center text-gray-600 mt-1">
              Overview of all borrowed books
            </p>
          </div>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Borrowed Books
            </h3>
            <p className="text-gray-500">No books have been borrowed yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Header Section */}
        <div className="p-4 sm:p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Borrow Summary
          </h1>
          <p className="text-gray-600 mt-1 text-center">
            List of all borrowed books
          </p>
        </div>

        {/* Mobile Card Layout */}
        <div className="block sm:hidden">
          <div className="divide-y divide-gray-100">
            {borrowSummaryData.map((item, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  {/* Book Cover */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
                      {item.book.title}
                    </h3>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">
                          ISBN:
                        </span>
                        <span className="text-xs text-gray-700 font-mono">
                          {item.book.isbn}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">
                          Quantity:
                        </span>
                        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          {item.totalQuantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 sm:w-20">Cover</TableHead>
                <TableHead className="min-w-32">Book Title</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowSummaryData.map((item, index) => (
                <TableRow key={index} className="h-16">
                  <TableCell className="py-4">
                    <div className="w-12 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium py-4">
                    {item.book.title}
                  </TableCell>
                  <TableCell className="py-4 text-sm font-mono">
                    {item.book.isbn}
                  </TableCell>
                  <TableCell className="py-4 text-right font-semibold">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full text-sm">
                      {item.totalQuantity}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;
