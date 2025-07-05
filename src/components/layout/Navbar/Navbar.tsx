import { BookOpenText, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-slate-700 rounded-lg">
                <BookOpenText size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800">
                Book<span className="text-emerald-600">Land</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/all-books"
                className="text-gray-600 hover:text-gray-900 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                All Books
              </Link>
              <Link
                to="/create-book"
                className="text-gray-600 hover:text-gray-900 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Add Book
              </Link>
              <Link
                to="/borrow-summary"
                className="text-gray-600 hover:text-gray-900 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Borrow Summary
              </Link>
            </div>
          </div>

          {/* Spacer for balanced layout */}
          <div className="hidden md:block w-16 lg:w-32"></div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/all-books"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                All Books
              </Link>
              <Link
                to="/add-book"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Add Book
              </Link>
              <Link
                to="/borrow-summary"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Borrow Summary
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
