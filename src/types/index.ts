// Shape of one category from categories.php
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

// categories.php wraps the list in a "categories" key
export interface CategoriesResponse {
  categories: Category[];
}

// The short version of a meal that filter.php returns
export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// meals is null when nothing matches (e.g. an unknown category)
export interface MealSummaryResponse {
  meals: MealSummary[] | null;
}

// The full meal that lookup.php returns.
// Ingredients come as strIngredient1..20 and strMeasure1..20,
// so the [key: string] line lets us read them with meal[`strIngredient${i}`].
export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string | null;
  [key: string]: string | null;
}

// meals is null for an unknown id, and the string "Invalid ID" for a non-number id
export interface MealResponse {
  meals: Meal[] | string | null;
}
