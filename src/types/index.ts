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
