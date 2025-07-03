import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
