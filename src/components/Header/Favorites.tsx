import { Heart, Trash2 } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites(); // Access context

  return (
    <div className="relative">
      {/* Heart Icon with Badge */}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="link" size="icon" className="p-0 m-0 shadow-none">
            <Heart className="w-8 h-8 aspect-square text-gray-600 hover:text-red-500 transition-colors duration-300" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <h2 className="text-lg font-bold text-gray-700 mb-2">Favorites</h2>
          {favorites.length > 0 ? (
            <ul className="p-0 space-y-0 ">
              {favorites.map((job, index) => (
                <li
                  key={index}
                  className="flex gap-12 py-2 m-0 justify-between text-sm "
                >
                  <Link
                    className="text-slate-600"
                    to={`/job-details/${job.id}`}
                  >
                    <span>
                      <span className="font-bold">{job.title}</span> at{" "}
                      {job.company}
                    </span>
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFavorite(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove favorite"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No favorites added yet.</p>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Favorites;
