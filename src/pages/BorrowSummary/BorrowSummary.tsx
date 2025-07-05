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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
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
      <div className="container mx-auto px-4  py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Borrow Summary</h1>
            <p className="text-gray-600 mt-1">Overview of all borrowed books</p>
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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header Section */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Borrow Summary</h1>
          <p className="text-gray-600 mt-1">List of all borrowed books</p>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Book Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Quantity Borrowed</TableHead>
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
                <TableCell className="py-4">{item.book.isbn}</TableCell>
                <TableCell className="py-4">{item.totalQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BorrowSummary;
