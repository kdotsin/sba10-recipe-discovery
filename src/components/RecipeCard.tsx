import { Link } from "react-router-dom";
import type { MealSummary } from "../types";

interface RecipeCardProps {
  meal: MealSummary;
}

function RecipeCard({ meal }: RecipeCardProps) {
  return (
    <Link
      to={`/recipe/${meal.idMeal}`}
      className="block overflow-hidden rounded border border-stone-200 bg-white hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-stone-800"
    >
      <img
        src={meal.strMealThumb}
        alt=""
        className="aspect-square w-full object-cover"
      />
      <p className="p-3 font-semibold text-stone-800">{meal.strMeal}</p>
    </Link>
  );
}

export default RecipeCard;
