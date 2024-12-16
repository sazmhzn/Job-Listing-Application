import {
  JobCard,
  JobCategoryCard,
  TopRecruiter,
} from "@/components/common/CustomCard";
import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jobsData, topRecrutiers } from "@/lib/data";
import { fetchJobs } from "@/services/jobsApi";
import { useEffect, useState } from "react";
import { JobData } from "./JobDetail";

const HeroSection = () => {
  return (
    <section className="p-4">
      <div className="flex items-center justify-between max-w-7xl px-0 mx-auto">
        <div className="flex gap-8 md:items-center min-h-[80vh] justify-between">
          <div className=" flex flex-col items-center sm:justify-center flex-1 space-y-4">
            <div className="relative">
              <h1 className="text-[#05264e] md:text-5xl text-4xl md:font-extrabold font-semibold">
                The{" "}
                <div className="w-[225px] h-[25px] absolute left-[90px] top-[30px]  opacity-10 bg-[#3c65f5]" />
                <span className="text-[#3c65f5] font-['Inter'] inline leading-[60px]">
                  Easiest Way{" "}
                </span>
                to Get Your New Job
              </h1>
              <div className="text-[#4f5e64] md:text-md text-sm font-normal font-['Inter'] leading-normal">
                Each month, more than 3 million job seekers turn to website in
                their search for work, making over 140,000 applications every
                single day
              </div>
            </div>

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

            <div className="flex gap-2 text-[#4f5e64] text-sm font-bold font-['Inter'] leading-normal">
              Popular Searches:
              <div className="flex">
                {" "}
                <div className="text-[#4f5e64] text-sm font-normal font-['Inter'] underline leading-normal">
                  Design
                </div>{" "}
                <div className="text-[#4f5e64] text-sm font-normal font-['Inter'] underline leading-normal">
                  Development
                </div>
                <div className="text-[#4f5e64] text-sm font-normal font-['Inter'] underline leading-normal">
                  Manager
                </div>
                <div className="text-[#4f5e64] text-sm font-normal font-['Inter'] underline leading-normal">
                  Senior
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 md:block hidden  relative">
            <img className="w-1/2 md:block hidden" src="/images/banner-1.png" />
          </div>
        </div>
      </div>
    </section>
  );
};

const NewHome = () => {
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
      <HeroSection />

      <section className="bg-white pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-4 mb-4">
            <div className="w-full px-4 space-y-2">
              <Heading
                level={2}
                className="text-[#05264e] text-center md:text-5xl text-3xl font-bold"
              >
                Job Listing{" "}
              </Heading>

              <div className="text-[#4f5e64] text-center text-lg font-normal font-['Inter'] leading-normal">
                Find the job that’s perfect for you. about 800+ new jobs
              </div>
            </div>
          </div>
          {loading ? (
            <p className="text-center text-lg">Loading jobs...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentJobs && currentJobs.length > 0 ? (
                  currentJobs.map((job, i) => <JobCard key={i} job={job} />)
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
                  className={`px-4 py-2 bg-[#e0e6f7] text-[#3c65f5] hover:text-white rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </Button>
                <span className="text-sm font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-[#e0e6f7] text-[#3c65f5] hover:text-white rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* by caregory */}
      <section className="bg-white py-8">
        <div className="flex  flex-col items-center justify-between max-w-7xl px-0 mx-auto">
          <div className="flex w-full  flex-col items-center justify-between ">
            <div className="space-y-4">
              <div className="w-full px-4 space-y-2">
                <Heading
                  level={2}
                  className="text-[#05264e] text-center md:text-5xl text-3xl font-bold"
                >
                  Browse by Category{" "}
                </Heading>

                <div className="text-[#4f5e64] text-center text-lg font-normal font-['Inter'] leading-normal">
                  Find the job that’s perfect for you. about 800+ new jobs
                </div>
              </div>
            </div>

            <div className="my-12 px-6 flex-1 relative grid md:grid-cols-3 lg:grid-cols-4 content-start gap-4 w-full">
              {jobsData.map((job, index) => (
                <JobCategoryCard
                  key={index}
                  title={job.title}
                  jobsAvailable={job.jobsAvailable}
                  imageSrc={job.imageSrc}
                  link={job.link}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ads */}
      <article className="bg-white py-8 w-full">
        <div className="flex items-center  justify-center md:max-w-7xl px-0 mx-auto">
          <div className=" bg-white/0 rounded shadow border border-[#e0e6f7] flex items-center justify-between gap-8 p-2">
            <img
              src="/images/jobbox-archielite-image.png"
              className="md:w-full w-1/2"
              alt=""
            />
            <div>
              <span className=" md:text-[42px] text-[#656f78] text-sm font-bold font-['Inter'] uppercase tracking-widest">
                We are
              </span>
              <div className=" text-[#05264e] md:text-[42px] text-lg font-extrabold font-['Inter'] uppercase">
                HIRING
              </div>
            </div>

            <div className="lg:inline-block hidden ">
              <span className="text-[#526489] lg:text-lg text-sm font-medium font-['Inter'] leading-[23px]">
                Let’s Work Together & Explore Opportunities
              </span>
            </div>

            <Button className="  text-center   bg-[#3c65f5] text-white text-sm font-normal font-['Inter'] leading-[14px]">
              Apply
            </Button>

            <img
              src="/images/jobbox-archielite-2.png"
              alt=""
              className="aspect-auto md:inline hidden"
            />
          </div>
        </div>
      </article>

      <section className="w-full min-h-screen m mx-auto p-6 flex flex-wrap items-center gap-6">
        <div className="flex items-center justify-between max-w-7xl px-0 mx-auto">
          <div className="flex w-full items-center justify-between ">
            {/* Images Container */}
            <div className="relative w-full md:1/2 flex justify-center items-center">
              {/* Main image */}
              <img
                className="w-[520.8px] bg-red-200 h-[470.05px] rounded-[32px] z-[5]"
                src="/images/img1.png"
                alt="Main job image"
              />
              {/* Background images */}
              <img
                className="absolute w-[426px] h-[354px] top-[-70px] left-[-100px] z-0"
                src="/images/banner2.png"
                alt="Decorative image 1"
              />
            </div>

            {/* Text Container */}
            <div className="w-full md:w-1/2 space-y-4">
              {/* Header */}
              <h2 className="text-[#777f87] m-0 p-0 text-2xl font-extrabold">
                Millions Of Jobs.
              </h2>
              <h1 className="text-[#05264e] m-0 p-0 text-4xl font-extrabold leading-tight">
                Find The One That’s Right For You
              </h1>

              {/* Description */}
              <p className="text-[#05264e] text-sm">
                Search all the open positions on the web. Get your own
                personalized salary estimate. Read reviews on over 600,000
                companies worldwide. The right job is out there.
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button className="px-6 py-3 bg-[#3c65f5] text-white text-sm font-normal rounded-lg">
                  Search jobs
                </Button>
                <Button
                  variant="link"
                  className="px-6 py-3 text-[#05264e] text-sm font-normal underline"
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className=" min-h-screen flex  flex-col items-center justify-center max-w-7xl px-0 mx-auto">
          <div className="flex w-full  flex-col items-center justify-between ">
            <div className="space-y-4">
              <div className="w-full space-y-2">
                <Heading
                  level={2}
                  className="text-[#05264e] text-center text-5xl font-bold"
                >
                  Top Recuiter
                </Heading>

                <div className="text-[#4f5e64] text-lg font-normal font-['Inter'] leading-normal">
                  Discover your next career move, freelance gig, or internship
                </div>
              </div>
            </div>

            <div className="grid w-full grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
              {topRecrutiers.map((job, index) => (
                <TopRecruiter
                  key={index}
                  companyName={job.companyName}
                  location={job.location}
                  openings={job.jobOpenings}
                  logoSrc={job.logoUrl}
                  rating={job.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* blogs */}
      <section className="bg-white py-8">
        <div className="flex  flex-col items-center justify-between max-w-7xl px-0 mx-auto">
          <div className="flex w-full  flex-col items-center justify-between ">
            <div className="space-y-4">
              <div className="w-full px-4 space-y-2">
                <Heading
                  level={2}
                  className="text-[#05264e] text-center md:text-5xl text-3xl font-bold"
                >
                  News and Blog
                </Heading>

                <div className="text-[#4f5e64] text-center text-lg font-normal font-['Inter'] leading-normal">
                  Get the latest news, updates and tips{" "}
                </div>
              </div>

              <div className="flex items-center flex-col gap-8 p-4">
                {/* Blog Posts Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1326px]">
                  {/* Blog Post Card */}
                  {[
                    {
                      title:
                        "21 Job Interview Tips: How To Make a Great Impression",
                      description:
                        "Consequatur voluptatem in aut consequatur ea et vero. Sed excepturi quia sit. Aut enim a vitae. Possimus omnis nobis rem et. Animi at numquam sed eum dolorem.… Recusandae est sunt vel quo iusto commodi saepe.",
                      author: "Janice Schimmel",
                      date: "Sep 24, 2024",
                      readTime: "12 mins to read",
                      imgUrl: "https://via.placeholder.com/400x255",
                      profileImg: "https://via.placeholder.com/35x35",
                    },
                    {
                      title: "Interview Question: Why Don’t You Have a Degree?",
                      description:
                        "A doloremque nihil occaecati aliquam et cum. Distinctio rerum eos minus. Nemo maxime voluptas illo modi. Voluptates repellendus minima quod beatae. Fugit… voluptatem ut in quibusdam mollitia. Facilis ratione nihil",
                      author: "Janice Schimmel",
                      date: "Sep 03, 2024",
                      readTime: "12 mins to read",
                      imgUrl: "https://via.placeholder.com/400x255",
                      profileImg: "https://via.placeholder.com/35x35",
                    },
                    {
                      title:
                        "39 Strengths and Weaknesses To Discuss in a Job Interview",
                      description:
                        "In aut aut temporibus nulla laboriosam. Velit doloremque facere quam quis incidunt eius. Qui nisi nam occaecati sed. At in perspiciatis aperiam dolor voluptates.",
                      author: "Janice Schimmel",
                      date: "Aug 30, 2024",
                      readTime: "12 mins to read",
                      imgUrl: "https://via.placeholder.com/400x255",
                      profileImg: "https://via.placeholder.com/35x35",
                    },
                  ].map((post, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-[#e0e6f7] p-4 flex flex-col space-y-4"
                    >
                      {/* Image */}
                      <img
                        className="w-full h-[255px] rounded-lg"
                        src="/images/img-news1.png"
                        alt="Post Image"
                      />

                      {/* Tags */}
                      <div className="flex space-x-2">
                        <span className="bg-[#e0e6f7] text-[#3c65f5] text-xs font-normal px-2 py-1 rounded-md">
                          New
                        </span>
                        <span className="bg-[#e0e6f7] text-[#3c65f5] text-xs font-normal px-2 py-1 rounded-md">
                          Event
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[#05264e] text-xl font-bold">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#4f5e64] text-sm font-medium leading-snug">
                        {post.description}
                      </p>

                      {/* Author & Date */}
                      <div className="flex items-center space-x-2 mt-4">
                        <img
                          className="w-9 h-9 rounded-full"
                          src={post.profileImg}
                          alt="Author"
                        />
                        <div className="flex flex-col">
                          <span className="text-[#05264e] text-sm font-bold opacity-70">
                            {post.author}
                          </span>
                          <span className="text-[#526489] text-xs font-medium">
                            {post.date}
                          </span>
                        </div>
                        <span className="ml-auto text-[#526489] text-xs font-medium">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View More Button */}
                <Button className="  bg-[#05264e] rounded px-[26px] py-[19px] flex justify-center items-center">
                  <span className="text-white text-sm font-normal font-['Inter'] leading-[14px]">
                    View more
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4">
        <div className="flex  flex-col items-center justify-between max-w-7xl px-0 py-8 mx-auto">
          <div className="flex w-full  flex-col items-center justify-between ">
            <div className=" md:p-11 p-4 rounded-2xl flex lg:flex-row flex-col bg-[#3c65f5] gap-[3px] lg:gap-[61.3px] items-center lg:items-start">
              {/* Main Image */}
              <img
                className="w-1/3 md:inline hidden aspect-square"
                src="/images/newsletter-image-left.png"
                alt="Main Image"
              />

              {/* Content Section */}
              <div className="flex-grow flex flex-col gap-10 items-center">
                {/* Heading */}
                <div className="text-center text-white md:text-[37px] text-lg font-bold md:leading-[55px] font-['Inter']">
                  New Things Will Always <br /> Update Regularly
                </div>

                {/* Subscription Section */}
                <div className="w-full justify-between bg-white rounded-[10px] flex items-center px-2">
                  {/* Email Input */}
                  <div className="w-full bg-white rounded-l-lg">
                    <Input
                      type="email"
                      className="shadow-none border-none text-[#777f87] h-[60px] w-full text-sm font-normal"
                      placeholder="Enter Your Email"
                    />
                  </div>

                  <Button className="w-[139.67px] py-4 bg-[#3c65f5] text-white text-sm font-medium rounded-r-lg">
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Secondary Image */}
              <img
                className="w-1/3 lg:inline hidden aspect-square"
                src="/images/newsletter-image-right.png"
                alt="Secondary Image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewHome;
