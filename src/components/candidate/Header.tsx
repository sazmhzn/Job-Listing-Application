import useResponsive from "@/hooks/useResponsive";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { menuItems } from "@/utils/menuItems";
import Favorites from "@/components/Header/Favorites";
import { useFavorites } from "@/context/FavoritesContext";
const Header = () => {
  const device = useResponsive();
  const { favorites } = useFavorites(); // Get the favorites from context

  return (
    <header className="sticky top-0 z-10 w-full">
      <nav className="bg-white p-4 dark:bg-gray-900">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/home" className="inline-flex gap-1 items-center">
            <img
              src="./vite.svg"
              className="h-4 aspect-square sm:h-8"
              alt="Job Seeker Logo"
            />
            <span className="hidden md:block self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Job Seeker
            </span>
          </Link>

          {/* Desktop Navigation */}
          {device ? (
            <>
              <Sheet>
                <div className="inline-flex gap-4 items-center">
                  {/* Add Favorites Component */}
                  <Favorites />
                </div>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent className="w-1/2">
                  <SheetHeader>
                    <SheetDescription>
                      <ul className="m-0 p-0 text-left">
                        {menuItems.map((item) => (
                          <li key={item.label} className="p-2 ml-0 relative">
                            {item.subItems ? (
                              <Collapsible className="group/collapsible">
                                <CollapsibleTrigger className="w-full flex items-center">
                                  {item.label}
                                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <ul className="ml-2 p-2 space-y-2">
                                    {item.subItems.map((subItem) => (
                                      <li key={subItem.label}>
                                        <Link to={subItem.link}>
                                          {subItem.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </CollapsibleContent>
                              </Collapsible>
                            ) : (
                              <Link
                                to={item.link}
                                className="text-[#007bff] font-medium"
                              >
                                {item.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <ul className="lg:flex pl-0 mb-0 items-center lg:gap-x-10 md:hidden">
                {menuItems.map((item) => (
                  <li key={item.label} className="group relative">
                    <Link
                      to={item.link}
                      className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold block"
                    >
                      {item.label}
                      {item.subItems && (
                        <ChevronDown className="ml-1 inline-block" size={16} />
                      )}
                    </Link>
                    {item.subItems && (
                      <ul className="absolute top-6 max-lg:top-8 left-0 z-50 hidden space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:block group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.label} className="border-b py-3">
                            <Link
                              to={subItem.link}
                              className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                            >
                              <subItem.icon
                                className="mr-4 inline-block"
                                size={20}
                              />
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="inline-flex gap-4 items-center">
                {/* Add Favorites Component */}
                <Favorites />
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
