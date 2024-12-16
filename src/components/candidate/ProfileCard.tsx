import { useSidebarMenuItems } from "@/hooks/useSidebarMenuItems";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export const ProfileCard = () => {
  const { menuItems, setActiveItem } = useSidebarMenuItems([
    { label: "My Profile", link: "/candidate", active: true },
    {
      label: "My Resume",
      link: "/candidate/my-resume",
      active: false,
    },
    {
      label: "My Jobs",
      link: "/candidate/my-jobs",
      active: false,
    },

    { label: "Job Alerts", link: "/candidate/job-alerts", active: false },
    { label: "CV Manager", link: "/candidate/cv-manager", active: false },
    {
      label: "Change Password",
      link: "/candidate/change-password",
      active: false,
    },
    { label: "Log Out", link: "/candidate/logout", active: false },
  ]);
  // const { menuItems, setActiveItem } = useSidebarMenuItems([
  //   { label: "My Profile", link: "/candidate", active: true },
  //   {
  //     label: "My Resume",
  //     link: "/candidate/my-resume",
  //     active: false,
  //   },
  //   {
  //     label: "My Jobs",
  //     link: "/candidate/my-jobs",
  //     active: false,
  //   },

  //   { label: "Job Alerts", link: "/candidate/job-alerts", active: false },
  //   { label: "CV Manager", link: "/candidate/cv-manager", active: false },
  //   {
  //     label: "Change Password",
  //     link: "/candidate/change-password",
  //     active: false,
  //   },
  //   { label: "Log Out", link: "/candidate/logout", active: false },
  // ]);

  return (
    <div className="  rounded-md  text-black text-center dark:text-gray-500">
      <div className="flex items-center border border-neutral-600 rounded-md flex-col py-4 px-2 bg-white">
        <Avatar className="h-24 w-24 aspect-square">
          <AvatarImage src="images/profile.png" alt="@shadcn" />
          <AvatarFallback>WN</AvatarFallback>
        </Avatar>
        <h4 className="mb-0 w-full  text-lg font-semibold">
          {" "}
          Wonajala Joshi
        </h4>
        <p className="font-normal">Product Designer</p>
      </div>

      <ul className="m-0 mt-2 p-0 text-left w-full">
        {menuItems.map((item, index) => (
          <li
            key={item.label}
            className={`w-full border-b p-2 ml-0 relative ${
              item.active && "bg-blue-100 border-r-4 border-blue-600"
            }`}
          >
            <Link
              to={item.link}
              className={`text-gray-600 w-full block ${
                item.active && "font-bold text-blue-600 w-full"
              }`}
              onClick={() => setActiveItem(index)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const EmployerCard = () => {
  const { menuItems, setActiveItem } = useSidebarMenuItems([
    { label: "My Company", link: "/employer", active: true },
    {
      label: "Post a Jobs",
      link: "/employer/post-job",
      active: false,
    },
    {
      label: "Manage Jobs",
      link: "/employer/manage-jobs",
      active: false,
    },

    { label: "Resume", link: "/employer/resume", active: false },
    {
      label: "Change Password",
      link: "/employer/change-password",
      active: false,
    },
    { label: "Log Out", link: "/employer/logout", active: false },
  ]);
  // const { menuItems, setActiveItem } = useSidebarMenuItems([
  //   { label: "My Profile", link: "/candidate", active: true },
  //   {
  //     label: "My Resume",
  //     link: "/candidate/my-resume",
  //     active: false,
  //   },
  //   {
  //     label: "My Jobs",
  //     link: "/candidate/my-jobs",
  //     active: false,
  //   },

  //   { label: "Job Alerts", link: "/candidate/job-alerts", active: false },
  //   { label: "CV Manager", link: "/candidate/cv-manager", active: false },
  //   {
  //     label: "Change Password",
  //     link: "/candidate/change-password",
  //     active: false,
  //   },
  //   { label: "Log Out", link: "/candidate/logout", active: false },
  // ]);

  return (
    <div className="  rounded-md  text-black text-center dark:text-gray-500">
      <div className="flex items-center border border-neutral-600 rounded-md flex-col py-4 px-2 bg-white">
        <Avatar className="h-24 w-24 aspect-square">
          <AvatarImage src="images/profile.png" alt="@shadcn" />
          <AvatarFallback>WN</AvatarFallback>
        </Avatar>
        <h4 className="mb-0 w-full  text-lg font-semibold">
          {" "}
          Wonajala Joshi
        </h4>
        <p className="font-normal">Product Designer</p>
      </div>

      <ul className="m-0 mt-2 p-0 text-left w-full">
        {menuItems.map((item, index) => (
          <li
            key={item.label}
            className={`w-full border-b p-2 ml-0 relative ${
              item.active && "bg-blue-100 border-r-4 border-blue-600"
            }`}
          >
            <Link
              to={item.link}
              className={`text-gray-600 w-full block ${
                item.active && "font-bold text-blue-600 w-full"
              }`}
              onClick={() => setActiveItem(index)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
