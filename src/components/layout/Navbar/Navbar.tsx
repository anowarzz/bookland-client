import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors"
            >
              BookLand
            </Link>
          </div>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-baseline space-x-8">
              <Link
                to="/all-books"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                All Books
              </Link>
              <Link
                to="/add-book"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Add Book
              </Link>
              <Link
                to="/borrow-summary"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Borrow Summary
              </Link>
            </div>
          </div>

          {/* Empty space for balance */}
          <div className="flex-shrink-0 w-24 hidden md:block"></div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
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
