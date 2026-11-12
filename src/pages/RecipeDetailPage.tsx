import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFavorites } from "../context/FavoritesContext";
import type { Meal, MealResponse } from "../types";

interface Ingredient {
  name: string;
  measure: string;
}

// Turns strIngredient1..20 / strMeasure1..20 into one clean list,
// skipping the empty slots ("" or null).
function getIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (name && name.trim() !== "") {
      ingredients.push({ name: name.trim(), measure: measure ? measure.trim() : "" });
    }
  }

  return ingredients;
}

function RecipeDetailPage() {
  const { recipeId } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const { data, loading, error } = useFetch<MealResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(recipeId ?? "")}`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  // meals can be null or "Invalid ID", so only continue if it's a real list
  if (!data || !Array.isArray(data.meals) || data.meals.length === 0) {
    return <p className="text-stone-700">Recipe not found.</p>;
  }

  const meal = data.meals[0];
  const ingredients = getIngredients(meal);
  const saved = isFavorite(meal.idMeal);

  // Instructions use line breaks between steps; drop the blank lines
  const steps = meal.strInstructions.split(/\r?\n/).filter((line) => line.trim() !== "");

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded"
      />

      <div>
        <h1 className="text-3xl font-bold text-stone-900">{meal.strMeal}</h1>
        <p className="mt-2 text-stone-600">
          <Link
            to={`/category/${meal.strCategory}`}
            className="underline hover:text-stone-900"
          >
            {meal.strCategory}
          </Link>{" "}
          · {meal.strArea}
        </p>

        <button
          type="button"
          onClick={() => (saved ? removeFavorite(meal.idMeal) : addFavorite(meal.idMeal))}
          className={
            saved
              ? "mt-4 min-h-11 rounded border border-stone-800 bg-white px-4 py-2 font-semibold text-stone-800 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800"
              : "mt-4 min-h-11 rounded bg-stone-800 px-4 py-2 font-semibold text-white hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800"
          }
        >
          {saved ? "Remove from Favorites" : "Add to Favorites"}
        </button>

        <h2 className="mt-6 text-xl font-semibold text-stone-900">Ingredients</h2>
        <ul className="mt-2 space-y-1">
          {ingredients.map((item, index) => (
            <li key={index}className="flex justify-between border-b border-stone-200 py-1">
              <span>{item.name}</span>
              <span className="text-stone-600">{item.measure}</span>
            </li>
          ))}
        </ul>

        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block underline hover:text-stone-900"
          >
            Watch on YouTube
          </a>
        )}
      </div>

      <section className="md:col-span-2">
        <h2 className="text-xl font-semibold text-stone-900">Instructions</h2>
        <div className="mt-2 max-w-prose space-y-3 leading-relaxed text-stone-800">
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      </section>
    </article>
  );
}

export default RecipeDetailPage;
