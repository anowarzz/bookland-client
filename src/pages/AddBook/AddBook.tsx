import { useEffect } from "react";
import AddBookForm from "./AddBookForm";

const AddBook = () => {
  
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <AddBookForm />
    </div>
  );
};

export default AddBook;
