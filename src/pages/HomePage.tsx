import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { CategoriesResponse } from "../types";

function HomePage() {
  const { data, loading, error } = useFetch<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-stone-900">Browse by category</h1>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.categories.map((category) => (
          <li key={category.idCategory}>
            <Link
              to={`/category/${category.strCategory}`}
              className="block rounded border border-stone-200 bg-white p-4 hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-stone-800"
            >
              <img
                src={category.strCategoryThumb}
                alt=""
                className="mx-auto h-24 object-contain"
              />
              <p className="mt-3 text-center font-semibold text-stone-800">
                {category.strCategory}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HomePage;
