import { Link } from "react-router-dom";
import type { MealSummary } from "../types";

interface RecipeCardProps {
  meal: MealSummary;
}

function RecipeCard({ meal }: RecipeCardProps) {
  return (
    <Link
      to={`/recipe/${meal.idMeal}`}
      className="block overflow-hidden rounded border border-line bg-white hover:border-paprika focus-visible:outline-2 focus-visible:outline-paprika"
    >
      <img
        src={meal.strMealThumb}
        alt=""
        className="aspect-square w-full object-cover"
      />
      <p className="p-3 font-semibold text-ink">{meal.strMeal}</p>
    </Link>
  );
}

export default RecipeCard;
