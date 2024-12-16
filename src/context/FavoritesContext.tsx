import { useGenericToast } from "@/hooks/useNotification";
import { createContext, useContext, useState, ReactNode } from "react";

// Define a type for favorite jobs
interface FavoriteJob {
  id: string;
  title: string;
  company: string;
}

// Define the context type
interface FavoritesContextType {
  favorites: FavoriteJob[];
  addFavorite: (job: FavoriteJob) => void;
  removeFavorite: (index: number) => void;
}

// Create the context
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Provider component
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { showSuccessToast, showErrorToast } = useGenericToast();

  const [favorites, setFavorites] = useState<FavoriteJob[]>([]);

  const addFavorite = (job: FavoriteJob) => {
    setFavorites((prev) => [...prev, job]);
    showSuccessToast(
      "Added from Favorites",
      `${job?.title} has been added from your favorites.`
    );
  };

  const removeFavorite = (index: number) => {
    setFavorites((prev) => {
      const removedJob = prev[index];
      const updatedFavorites = prev.filter((_, i) => i !== index);
      showErrorToast(
        "Removed from Favorites",
        `${removedJob?.title} has been removed from your favorites.`
      );
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the FavoritesContext
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
