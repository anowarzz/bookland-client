// book type
export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// book prop
export interface BookProps {
  book: IBook;
}

// borrow summary type (aggregated data from API)
export interface IBorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

// borrow record type
export interface IBorrowRecord {
  _id: string;
  book: string; // Book reference ID only
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
