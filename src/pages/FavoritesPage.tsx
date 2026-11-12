import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../context/FavoritesContext";
import type { MealResponse } from "../types";

interface FavoriteItemProps {
  id: string;
}

// The context only stores ids, so each favorite looks up its own recipe.
// Hooks can't be called inside a .map(), which is why this is its own component.
function FavoriteItem({ id }: FavoriteItemProps) {
  const { data, loading, error } = useFetch<MealResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data || !Array.isArray(data.meals) || data.meals.length === 0) {
    return <p className="text-stone-700">This recipe is no longer available.</p>;
  }

  return <RecipeCard meal={data.meals[0]} />;
}

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-stone-900">Your favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-stone-700">
          You haven't saved any recipes yet.{" "}
          <Link to="/" className="underline hover:text-stone-900">
            Browse categories
          </Link>{" "}
          and add some.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {favorites.map((id) => (
            <li key={id}>
              <FavoriteItem id={id} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FavoritesPage;
