import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* "*" matches any URL not listed above */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
