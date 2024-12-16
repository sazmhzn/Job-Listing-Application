import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// [
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
// ]

export const useSidebarMenuItems = (sidebarItem) => {
  const [menuItems, setMenuItems] = useState(sidebarItem);

  console.log(menuItems);

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    console.log(menuItems);
  }, [location]);

  const setActiveItem = (index: number) => {
    setMenuItems(
      menuItems.map((item, i) => ({
        ...item,
        active: i === index,
      }))
    );
  };

  useEffect(() => {
    const updatedMenuItems = menuItems.map((item) => ({
      ...item,
      active: item.link === location.pathname,
    }));
    setMenuItems(updatedMenuItems);
  }, [location]);

  return { menuItems, setActiveItem };
};
