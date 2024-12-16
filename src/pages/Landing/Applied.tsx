import CustomSearch from "@/components/common/CustomSearch";
import { fetchAppliedJobs, JobApplication } from "@/services/jobsApi";
import { useEffect, useState } from "react";

const About = () => {
  const [applicationsjobs, setApplicationsJobs] = useState<JobApplication[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const jobsPerPage = 8;

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchAppliedJobs();
        setApplicationsJobs(Array.isArray(data) ? data : []); // Ensure jobs is an array
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
  const currentJobs = Array.isArray(applicationsjobs)
    ? applicationsjobs.slice(indexOfFirstJob, indexOfLastJob)
    : [];

  // Handle pagination
  const totalPages = Math.ceil(applicationsjobs.length / jobsPerPage);

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
      {/* Header Section */}
      <section className="p-4 bg-white">
        <div className="flex min-h-[20vh] items-center rounded-lg justify-between max-w-7xl px-0 py-10 mx-auto">
          <div className="mx-auto w-full bg-blue-50 p-4 flex gap-8 md:items-center justify-between">
            <div className="w-full md:w-2/3 mx-auto space-y-4">
              <div className="relative flex flex-col items-center justify-center">
                <h1 className="text-[#05264e] text-center md:text-5xl text-4xl md:font-extrabold font-semibold m-0 p-0">
                  <div className="w-[200px] h-[25px] absolute left-[135px] top-[30px] opacity-10 bg-[#3c65f5]" />
                  <span className="text-[#3c65f5] font-['Inter'] inline leading-[60px]">
                    {applicationsjobs.length} Jobs{" "}
                  </span>
                  Available Now
                </h1>
                <div className="text-[#4f5e64] text-center w-[70ch] md:text-md text-sm font-normal font-['Inter'] leading-normal">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.isArray(currentJobs) && currentJobs.length > 0 ? (
                  currentJobs.map((applicationsjobs) => (
                    <div
                      key={applicationsjobs.id}
                      className="bg-white shadow-md rounded-lg p-4"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        {applicationsjobs.jobTitle}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Applicant: {applicationsjobs.fullName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Applied on:{" "}
                        {new Date(
                          applicationsjobs.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No jobs available.
                  </p>
                )}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-[#e0e6f7] text-[#3c65f5] rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-[#e0e6f7] text-[#3c65f5] rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default About;
