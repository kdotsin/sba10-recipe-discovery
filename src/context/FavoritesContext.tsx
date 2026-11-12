import { createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface FavoritesContextType {
  favorites: string[]; // list of recipe ids (idMeal)
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  function addFavorite(id: string) {
    // Use prev so two quick clicks can't work from an old list,
    // and skip the id if it's already saved
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function removeFavorite(id: string) {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  }

  function isFavorite(id: string) {
    return favorites.includes(id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Shortcut so components can write useFavorites() instead of useContext(FavoritesContext).
// Throws if a component uses it outside <FavoritesProvider>, which makes that mistake easy to spot.
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside a FavoritesProvider");
  }
  return context;
}
