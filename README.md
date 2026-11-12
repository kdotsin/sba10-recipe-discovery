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

## Reflection

### Most challenging part

The hardest part was handling everything TheMealDB returns when something goes wrong. I expected a bad request to return an error status, but the API almost always returns `200 OK`:

- An unknown category or a search with no matches returns `{ "meals": null }`.
- A recipe id that isn't a number, like `/recipe/abc`, returns `{ "meals": "Invalid ID" }`. That's a string, not a list.

So `useFetch` treats these as successful requests, and the error state never shows. If my detail page had only checked for `null`, it would have broken on `/recipe/abc`, because `meals[0]` on a string is just the letter "I". I fixed it by checking `Array.isArray(data.meals)` before using the data. I also typed `meals` as `Meal[] | string | null`, so TypeScript makes me handle all three cases.

This taught me to test the API directly with bad inputs before writing the page, instead of assuming it behaves the way I expect.

### A design decision

**Favorites store only recipe IDs, and each favorite looks up its own recipe.**
`FavoritesContext` saves a list of `idMeal` strings to localStorage, not full recipe objects. On the Favorites page, a small `FavoriteItem` component calls `useFetch` with `lookup.php?i=<id>` for each ID.

I chose this because:
- The brief asks the context to hold a list of IDs.
- Saved data stays small and can't go out of date. The recipe details always come from the API.

The trade-off is one request per favorite. That's fine for a personal list, but storing `{ id, name, thumbnail }` would load faster if the list got long.

`FavoriteItem` exists because hooks can't be called inside `.map()`. Making each favorite its own component gives every card its own loading and error state.
