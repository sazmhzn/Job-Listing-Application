import { Button } from "../ui/button";

const CustomSearch = () => {
  return (
    <div className=" bg-white w-full rounded-lg shadow justify-center items-start inline-flex">
      <form action="/" method="POST" className="w-full p-2">
        <div className="bg-white flex max-sm:flex-col gap-4 rounded items-center justify-between sm:flex-row sm:justify-center">
          <input
            type="text"
            name="industry"
            id="industry"
            placeholder="Indusrty"
            className="placeholder:text-sm placeholder:font-normal text-[#4f5e64] py-3 px-2 w-full placeholder:text-[#4f5e64] font-semibold shadow-none active:outline-none focus-within:outline-none"
            required
          />
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            className="placeholder:text-sm placeholder:font-normal text-[#4f5e64] py-3 px-2 w-full placeholder:text-[#4f5e64] font-semibold shadow-none active:outline-none focus-within:outline-none"
            required
          />
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Your Keywords"
            className="placeholder:text-sm placeholder:font-normal text-[#4f5e64] py-3 px-2 w-full placeholder:text-[#4f5e64] font-semibold shadow-none active:outline-none focus-within:outline-none"
            required
          />

          <Button className="inline-flex w-full items-center justify-center flex-shrink-0 px-4 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md sm:mt-0  sm:w-auto hover:bg-blue-700 focus:bg-blue-700">
            Find Jobs
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomSearch;
