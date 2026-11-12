import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import type { MealSummaryResponse } from "../types";

function CategoryPage() {
  // Reads :categoryName from the URL, e.g. /category/Seafood -> "Seafood"
  const { categoryName } = useParams();

  const { data, loading, error } = useFetch<MealSummaryResponse>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName ?? "")}`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-stone-900">{categoryName}</h1>

      {!data?.meals ? (
        <p className="text-stone-700">No recipes found in this category.</p>
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

export default CategoryPage;
