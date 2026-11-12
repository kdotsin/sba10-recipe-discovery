import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="border-b border-stone-300 bg-stone-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-stone-900">
          Recipe Discovery
        </Link>

        <Link to="/favorites" className="text-stone-700 hover:text-stone-900">
          Favorites
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
