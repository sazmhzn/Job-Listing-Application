import React from "react";

interface JobCardProps {
  jobTitle: string;
  companyName: string;
  location: string;
  skills: string[];
  posted: string;
  status: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  jobTitle,
  companyName,
  location,
  skills,
  posted,
  status,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{jobTitle}</h3>
      <p className="text-gray-600 mb-2">{companyName}</p>
      <p className="text-gray-500 mb-2">{location}</p>
      <div className="mb-2">
        <span className="font-semibold">Skills: </span>
        {skills.join(", ")}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">Posted: {posted}</span>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            status === "Under Review"
              ? "bg-yellow-200 text-yellow-800"
              : status === "Interviewed"
              ? "bg-blue-200 text-blue-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};
