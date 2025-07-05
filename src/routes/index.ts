import BookDetails from "@/components/BookDetails";
import Main from "@/components/layout/Main/Main";
import AddBook from "@/pages/AddBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";

import HomePage from "@/pages/Home/HomePage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "all-books",
        Component: AllBooks,
      },
      {
        path: "books/:bookId",
        Component: BookDetails,
      },
      {
        path: "create-book",
        Component: AddBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
