import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobs } from "@/services/jobsApi";
import { useFavorites } from "@/context/FavoritesContext";
import { CaseLower, Heart } from "lucide-react";

import JobForm from "../../components/JobForm";

const JobDetail = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addFavorite } = useFavorites(); // Use the addFavorite function from context

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const jobs = await fetchJobs();
        const selectedJob = jobs.find((job) => job.id === id);
        if (selectedJob) {
          setJob(selectedJob);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    getJobDetails();
  }, [id]);

  const saveToFavorites = () => {
    if (job) {
      addFavorite({ title: job.title, company: job.company });
      alert("Job added to favorites!");
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="bg-blue-50 w-full relative">
        <div className=" p-4 mx-auto sm:p-6 lg:p-8 max-w-7xl min-h-[40vh] flex">
          <div className="flex md:flex-row flex-col items-center md:justify-between gap-4 w-full">
            <div className="flex gap-6">
              <img
                src={job.logo}
                alt={` logo`}
                className="aspect-square lg:h-24 h-16 bg-blue-200 rounded-sm p-1"
              />
              <div className="w-full space-y-3">
                <h3 className="text-2xl font-semibold p-0 m-0 text-gray-800">
                  {job.title} Position
                </h3>
                <div className="space-x-4">
                  <span>{job.company}</span>
                  <span>{job.location}</span>
                  <span>{job.createdDate}</span>
                  <span>{job.salaryRange}</span>
                </div>

                <div className="space-x-2">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 font-normal">
                    {job.jobType}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={saveToFavorites}
              className="flex items-center gap-2 px-2 py-2 bg-blue-200 text-slates-600 text-sm font-medium rounded"
            >
              <Heart className="w-5 h-5" /> Add to Favorites
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white min-h-[10vh] md:p-4">
        <div className="max-w-7xl p-4 mx-auto">
          <div className=" grid grid-col-1 md:grid-cols-[1fr_500px] gap-6">
            <div>
              <h4>Job Description </h4>
              <p className="text-gray-600">{job.description}</p>
            </div>

            <aside className="bg-blue-50 rounded-md p-4">
              <header>
                <h4 className="text-neutral-800"> Job Overview</h4>
              </header>

              <div className="flex items-start gap-2">
                <CaseLower />
                <div>
                  <h4 className="text-lg m-0 p-0">Date Posted:</h4>
                  <p>Posted: 1 hours ago</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <JobForm job={job} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetail;
