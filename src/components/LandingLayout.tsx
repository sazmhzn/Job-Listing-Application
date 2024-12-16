import { Outlet } from "react-router-dom";
import Header from "./candidate/Header";
import Footer from "./candidate/Footer";

const Landing = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Landing;
