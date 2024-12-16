import { Outlet } from "react-router-dom";
import Header from "./candidate/Header";
import Footer from "./candidate/Footer";
import { Toaster } from "@/components/ui/toaster";

const Landing = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Landing;
