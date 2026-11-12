# Recipe Discovery

A React + TypeScript single-page app for browsing recipes from [TheMealDB](https://www.themealdb.com/api.php). Browse by category, search by name, open a recipe for its ingredients and instructions, and save favorites that persist across browser sessions.

## Run it

```bash
npm install
npm run dev
```

## Pages

| Route | What it shows |
| --- | --- |
| `/` | All recipe categories |
| `/category/:categoryName` | Recipes in one category |
| `/recipe/:recipeId` | Full recipe, with an Add/Remove Favorites button |
| `/favorites` | Saved recipes, or a prompt to add some |
| `/search?query=...` | Recipes matching the search bar |
| `*` | Not found page |

## How it's built

- **`useFetch<T>(url)`** (`src/hooks/useFetch.ts`) returns `{ data, loading, error }`. It ignores responses from a request that's out of date, so fast navigation can't show the wrong data.
- **`useLocalStorage<T>(key, initial)`** (`src/hooks/useLocalStorage.ts`) works like `useState`, but also saves the value to `localStorage`.
- **`FavoritesContext`** (`src/context/FavoritesContext.tsx`) stores favorite recipe IDs with `useLocalStorage` and provides `favorites`, `addFavorite`, `removeFavorite` and `isFavorite`.
- **Components:** `Navbar` (with search), `RecipeCard`, `Spinner`, `ErrorMessage`.
- **Routing:** React Router (`react-router-dom`).
- **Styling:** Tailwind v4 (browser CDN), with the theme colors and fonts (Fraunces + Inter Tight) set in `index.html`.

## API quirks handled

- `filter.php` and `search.php` return `{ "meals": null }` when nothing matches.
- `lookup.php` returns `{ "meals": "Invalid ID" }` (a string) for a non-numeric id, so pages check `Array.isArray(data.meals)`.
- Recipes store ingredients as `strIngredient1`–`20` and `strMeasure1`–`20`, and some of those slots are empty strings or `null`.
