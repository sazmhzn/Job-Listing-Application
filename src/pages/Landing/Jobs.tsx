import { useEffect, useState } from "react";
import { JobCard } from "@/components/common/CustomCard";
import CustomSearch from "@/components/common/CustomSearch";
import { fetchJobs } from "@/services/jobsApi";
import { Button } from "@/components/ui/button";
import { JobData } from "./JobDetail";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const jobsPerPage = 8;

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(Array.isArray(data) ? data : []); // Ensure jobs is an array
      } catch (err) {
        setError("Failed to load jobs. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  // Calculate current jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = Array.isArray(jobs)
    ? jobs.slice(indexOfFirstJob, indexOfLastJob)
    : [];

  // Handle pagination
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <section className="p-4 bg-white">
        <div className="flex min-h-[20vh] items-center rounded-lg justify-between max-w-7xl px-0 py-10 mx-auto">
          <div className="mx-auto w-full bg-blue-50 p-4 flex gap-8 md:items-center justify-between">
            <div className="md:w-2/3 w-full mx-auto space-y-4">
              <div className="relative flex flex-col items-center justify-center">
                <h1 className="text-[#05264e] text-center md:text-5xl text-4xl md:font-extrabold font-semibold m-0 p-0">
                  <div className="w-[200px] h-[25px] absolute left-[135px] top-[30px] opacity-10 bg-[#3c65f5]" />
                  <span className="text-[#3c65f5] font-['Inter'] inline leading-[60px]">
                    {jobs.length} Jobs{" "}
                  </span>
                  Available Now
                </h1>
                <div className="text-[#4f5e64] text-center md:w-[70ch] md:text-md text-sm font-normal font-['Inter'] leading-normal">
                  Discover exciting job opportunities curated for you.
                </div>
              </div>
              <CustomSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="bg-white pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <p className="text-center text-lg">Loading jobs...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentJobs && currentJobs.length > 0 ? (
                  currentJobs.map((job) => <JobCard job={job} />)
                ) : (
                  <p className="text-center text-gray-500">
                    No jobs available.
                  </p>
                )}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-8">
                <Button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-[#e0e6f7] font-semibold text-[#3c65f5] hover:text-white rounded ${
                    currentPage === 1 ? "cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </Button>
                <span className="text-sm text-neutral-400 font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-[#e0e6f7] text-[#3c65f5] hover:text-white rounded ${
                    currentPage === totalPages
                      ? "pointer-events-none"
                      : "font-semibold"
                  }`}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Jobs;
