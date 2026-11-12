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
