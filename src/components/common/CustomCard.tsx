import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useFavorites } from "@/context/FavoritesContext";

interface JobCategoryCardProps {
  title: string;
  jobsAvailable: number;
  imageSrc: string;
  link: string;
}

export const JobCategoryCard = ({
  title,
  jobsAvailable,
  imageSrc,
  link,
}: JobCategoryCardProps) => {
  return (
    <div className="flex gap-4 p-2 relative bg-white rounded-xl border border-[#061224]/10">
      <img
        className="w-[42px] h-[42px] aspect-square "
        src={imageSrc}
        alt="Job Icon"
      />
      <div className="space-y-2">
        <div className=" text-[#05264e] text-base font-medium font-['Inter'] leading-tight">
          <Link to={link}>{title} </Link>
        </div>
        <div className="w-[96.89px] h-[18px] left-[71px] top-[49.69px]  text-[#4f5e64] text-xs font-medium font-['Inter'] leading-[18px]">
          {jobsAvailable} Jobs Available
        </div>
      </div>
    </div>
  );
};

interface JobCardOfTheDayProps {
  companyName: string;
  location: string;
  position: string;
  jobType: string;
  postedDate: string;
  description: string;
  skills?: string[];
  salaryInfo?: string;
  logoSrc?: string;
  link: string;
}

export const JobCardOfTheDay = ({
  companyName,
  location,
  position,
  jobType,
  postedDate,
  description,
  skills = [],
  salaryInfo = "Sign in to view salary",
  logoSrc = "https://via.placeholder.com/52x52",
  link,
}: JobCardOfTheDayProps) => {
  return (
    <div className="bg-[#f8faff] rounded-lg border border-[#e0e6f7] p-6 flex flex-col gap-4">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <img
          className="w-[52px] h-[52px]"
          src={logoSrc}
          alt={`${companyName} logo`}
        />
        <div>
          <div className="text-[#05264e] text-lg font-bold font-['Inter']">
            {companyName}
          </div>
          <div className="text-[#777f87] text-xs font-normal font-['Inter']">
            {location}
          </div>
        </div>
      </div>

      {/* Position and Job Type */}
      <div>
        <div className="text-[#05264e] text-sm font-bold font-['Inter'] leading-tight">
          {position}
        </div>
        <div className="flex gap-4 text-[#777f87] text-xs font-normal font-['Inter'] mt-1">
          <span>{jobType}</span>
          <span>{postedDate}</span>
        </div>
      </div>

      {/* Description */}
      <div className="text-[#4f5e64] text-sm font-medium font-['Inter'] line-clamp-3">
        {description}
      </div>

      {/* Skills */}
      <div className="flex gap-2 flex-wrap">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="px-3 py-1 bg-[#eff3fc] rounded-[5px] text-center text-[#4f5e64] text-xs font-normal font-['Inter'] leading-3"
          >
            {skill}
          </div>
        ))}
      </div>

      {/* Salary Information */}
      <Link
        to="/my-account"
        className="m-0 p-0 text-[#3c65f5] text-base font-semibold font-['Inter'] flex items-center gap-1"
      >
        {salaryInfo}
      </Link>

      {/* Apply Button */}
      <Button
        asChild
        className=" px-6 py-3  text-[#3c65f5] text-xs font-normal font-['Inter'] capitalize bg-[#e0e6f7] rounded"
      >
        <Link
          to={link}
          className=" text-[#3c65f5] text-xs font-normal font-['Inter'] capitalize"
        >
          Apply Now
        </Link>
      </Button>
    </div>
  );
};

interface TopRecruiterProps {
  companyName: string;
  location: string;
  openings: number;
  logoSrc: string;
  rating: number;
}

export const TopRecruiter = ({
  companyName,
  location,
  openings,
  logoSrc,
  rating,
}: TopRecruiterProps) => {
  return (
    <div className="bg-white rounded-xl border border-[#061224]/10 p-4 flex flex-col justify-between">
      <div className="flex flex-col items-start gap-2">
        <img
          className="w-[42px] h-[42px] rounded-full"
          src={logoSrc}
          alt={`${companyName} logo`}
        />
        <div>
          <h3 className="text-[#05264e] text-base font-bold my-1">
            {companyName}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < rating ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
            <span className="text-[#777f87] text-xs font-medium">
              ({rating})
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <span className="text-[#777f87] text-xs font-normal">{location}</span>
        </div>
        <div className="text-[#777f87] text-xs font-normal">
          {openings} Opening Jobs
        </div>
      </div>
    </div>
  );
};

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    jobType?: string;
    createdAt: string;
    description: string;
    tags?: string[];
  };
}

export const JobCard = ({ job }: JobCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some(
    (favorite) =>
      favorite.title === job.title && favorite.company === job.company
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      // Remove from favorites
      removeFavorite(
        favorites.findIndex(
          (favorite) =>
            favorite.title === job.title && favorite.company === job.company
        )
      );
    } else {
      // Add to favorites
      addFavorite({ id: job.id, title: job.title, company: job.company });
    }
  };

  return (
    <div className="w-full space-y-4 max-w-sm p-6 bg-[#f8faff] rounded-lg border border-[#e0e6f7] flex flex-col gap-2">
      <header>
        <div className="flex justify-between">
          <h1 className="m-0 p-0 text-[#05264e] text-base font-bold leading-relaxed">
            {job.title}
          </h1>

          <Button
            onClick={toggleFavorite}
            className={`flex items-center gap-2 px-2 py-2  text-slates-600 text-sm font-medium rounded-md ${
              isFavorite
                ? "bg-red-200 hover:bg-red-300"
                : "bg-blue-200 hover:bg-blue-300"
            }`}
          >
            {isFavorite ? (
              <HeartFilledIcon className="w-5 h-5 text-red-500" />
            ) : (
              <Heart className="w-5 h-5 text-blue-500" />
            )}
          </Button>
        </div>

        {/* Job Type and CreatedAt Date */}
        <div className="flex gap-4 text-xs text-[#a0abb8] font-medium">
          <span>{job.jobType || "Full Time"}</span>
          <span>|</span>
          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
      </header>

      {/* Job Description */}
      <p className="text-[#4f5e64] line-clamp-3 text-sm font-medium font-['Plus Jakarta Sans'] leading-snug">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex gap-2">
        {job.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-[#eff3fc] text-xs text-[#4f5e64] rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Apply Button */}
      <Button
        asChild
        className="mt-4 py-2 bg-[#e0e6f7] text-[#3c65f5] text-xs font-semibold rounded w-full hover:text-white"
      >
        <Link to={`/job-details/${job.id}`}>View Details</Link>
      </Button>
    </div>
  );
};
