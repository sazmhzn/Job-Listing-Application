import { memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import useResponsive from "@/hooks/useResponsive";
import { menuItems } from "@/utils/menuItems";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import Favorites from "@/components/Header/Favorites";

const DesktopMenu = memo(() => {
  const location = useLocation();
  return (
    <ul className="lg:flex pl-0 mb-0 items-center lg:gap-x-10 md:hidden">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.link; // Check if the link is active
        return (
          <li key={item.label} className="group relative">
            <Link
              to={item.link}
              className={`${
                isActive
                  ? "text-[#007bff] font-bold" // Style for active link
                  : "text-gray-600 font-semibold"
              } hover:text-[#007bff] hover:fill-[#007bff] block`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
});

const MobileMenu = memo(() => (
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent className="w-1/2">
      <SheetHeader>
        <SheetDescription>
          <ul className="m-0 p-0 text-left">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.link; // Check if the link is active
              return (
                <li key={item.label} className="p-2 ml-0 relative">
                  <Link
                    to={item.link}
                    className={`${
                      isActive
                        ? "text-[#007bff] font-bold" // Style for active link
                        : "text-gray-600 font-medium"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
));

const Header = () => {
  const device = useResponsive();

  // Memoize menu rendering to prevent unnecessary re-renders
  const renderMenu = useMemo(() => {
    return device ? (
      <div className="inline-flex items-center gap-2">
        <div className="inline-flex gap-4 items-center">
          <Favorites />
        </div>
        <MobileMenu />
      </div>
    ) : (
      <>
        <DesktopMenu />
        <div className="inline-flex gap-4 items-center">
          <Favorites />
        </div>
      </>
    );
  }, [device]);

  return (
    <header className="sticky top-0 z-10 w-full">
      <nav className="bg-white p-4 dark:bg-gray-900">
        <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="inline-flex gap-1 items-center">
            <img
              src="./logo.png"
              className="h-4 aspect-square sm:h-8"
              alt="Job Seeker Logo"
            />
            <span className="hidden md:block self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Job Seeker
            </span>
          </Link>

          {renderMenu}
        </div>
      </nav>
    </header>
  );
};

export default Header;
