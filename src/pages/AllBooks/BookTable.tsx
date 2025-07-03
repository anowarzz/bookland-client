import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BookProps } from "@/types";

const BookTable = ({ book }: BookProps) => {
  return (
    <div className="container mx-auto p-4">
      <Table>
        <TableCaption>Book Details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Title</TableCell>
            <TableCell>{book.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Author</TableCell>
            <TableCell>{book.author}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Genre</TableCell>
            <TableCell>{book.genre}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ISBN</TableCell>
            <TableCell>{book.isbn}</TableCell>
          </TableRow>
          {book.description && (
            <TableRow>
              <TableCell className="font-medium">Description</TableCell>
              <TableCell>{book.description}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell className="font-medium">Copies</TableCell>
            <TableCell>{book.copies}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Status</TableCell>
            <TableCell>
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
          </TableRow>
          {book.createdAt && (
            <TableRow>
              <TableCell className="font-medium">Created At</TableCell>
              <TableCell>
                {new Date(book.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          )}
          {book.updatedAt && (
            <TableRow>
              <TableCell className="font-medium">Updated At</TableCell>
              <TableCell>
                {new Date(book.updatedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookTable;
