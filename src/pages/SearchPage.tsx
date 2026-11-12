import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import type { MealResponse } from "../types";

function SearchPage() {
  // Reads ?query=... from the URL, e.g. /search?query=Arrabiata -> "Arrabiata"
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") ?? "").trim();

  // Hooks must run on every render, so this fetch runs even when query is empty.
  // We just don't show its results in that case (see below).
  const { data, loading, error } = useFetch<MealResponse>(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
  );

  // An empty search returns random meals from the API, which would be confusing
  if (query === "") {
    return <p className="text-muted">Type a recipe name in the search bar to get started.</p>;
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1 className="mb-6 font-display text-3xl font-bold text-ink">
        Results for "{query}"
      </h1>

      {!data || !Array.isArray(data.meals) ? (
        <p className="text-muted">No recipes match "{query}". Try a different name.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data.meals.map((meal) => (
            <li key={meal.idMeal}>
              <RecipeCard meal={meal} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SearchPage;
