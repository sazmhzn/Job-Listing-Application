import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="flex flex-col items-center mx-auto bg-red">
        <h1 className="text-3xl font-bold text-neutral-800">404</h1>
        <h4 className="text-4xl text-center font-normal">
          Oops! This page cannot be found
        </h4>
        <Button asChild className="bg-blue-800">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default PageNotFound;
