import HeroSection from "@/components/HeroSection";
import AllBooksGrid from "./AllBooksGrid";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="py-16 bg-muted/30">
        <AllBooksGrid />
      </div>
    </div>
  );
};

export default HomePage;
