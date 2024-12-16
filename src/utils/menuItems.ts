import { Home, User, Briefcase, FileText } from "lucide-react";

export const menuItems = [
  {
    label: "Home",
    link: "/",
    icon: Home,
  },
  {
    label: "Find Jobs",
    link: "/jobs",
    icon: Briefcase, // Changed from Home to more appropriate Briefcase icon
  },
  {
    label: "Applied Jobs",
    link: "/applied",
    icon: User, // Changed from Home to User icon to represent applied jobs
  },
  {
    label: "About",
    link: "/about",
    icon: FileText,
  },
];
