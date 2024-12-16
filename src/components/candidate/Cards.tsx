import { Heart, LocateIcon } from "lucide-react";

interface RecentJobCardProps {
  logoSrc?: string;
  position: string;
  location: string;
  company?: string;
  type: string;
  published: string;
  salary: string;
}

export const RecentJobCards = ({
  logoSrc,
  position,
  location,
  type,
  published,
  salary,
}: RecentJobCardProps) => {
  return (
    <article className="bg-white h-auto p-4 w-full border-l-4 hover:border-l-4 hover:border-blue-600">
      <header className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <img
            src={logoSrc}
            alt={`${position} logo`}
            className="aspect-square lg:h-20 h-12 bg-blue-200 rounded-sm p-1"
          />
          <div className="space-y-2">
            <h3 className="mb-1">{position}</h3>
            <div className="flex lg:gap-4 gap-1 flex-wrap">
              <div className="flex items-center gap-1">
                <LocateIcon className="h-4" />
                <span className="">{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <LocateIcon className="h-4" />
                <span className="">{type}</span>
              </div>
              <div className="flex items-center gap-1">
                <LocateIcon className="h-4 " />
                <span className="">{published}</span>
              </div>
            </div>
          </div>
        </div>
        <Heart />
      </header>
      <div className="flex justify-between items-center mt-6">
        <div className=" bg-blue-200 px-2 py-1 text-blue-700 rounded-md">
          {type}
        </div>
        <h4 className=" text-neutral-900 ">{salary}</h4>{" "}
      </div>
    </article>
  );
};

export const NewRecentJobCards = ({
  logoSrc,
  position,
  location,
  type,
  company,
}: RecentJobCardProps) => {
  return (
    <article className="bg-white h-auto px-3 py-3 w-full border rounded-2xl flex flex-col justify-between gap-4">
      <header className="flex items-start justify-between gap-4">
        <div className="flex justify-between gap-4 w-full">
          <div className="w-full space-y-1">
            <h3 className="text-lg font-bold p-0 m-0 text-gray-800">
              {position}
            </h3>
            <p className="font-semibold">{company}</p>
          </div>
          <img
            src={logoSrc}
            alt={`${position} logo`}
            className="aspect-square lg:h-12 h-12 bg-blue-200 rounded-sm p-1"
          />
        </div>
      </header>

      <div className="flex flex-col space-y-4">
        <div className="flex gap-4 space-y-2">
          <div className="flex gap-1 text-green-600">
            <LocateIcon className="" />
            <span className="m-0 font-semibold">{location}</span>
          </div>
          <span className=" m-0 rounded-full px-2 text-green-600 font-semibold">
            {type}
          </span>
        </div>
      </div>
    </article>
  );
};


