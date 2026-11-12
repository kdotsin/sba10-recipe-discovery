import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = search.trim()
    if (query === '') return

    // encodeURIComponent keeps characters like & ? # from breaking the URL
    navigate(`/search?query=${encodeURIComponent(query)}`)
  }

  return (
    <header className="border-b border-stone-300 bg-stone-50">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-xl font-bold text-stone-900">
          Recipe Discovery
        </Link>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="order-last flex w-full gap-2 sm:order-none sm:w-auto"
        >
          <label htmlFor="search" className="sr-only">
            Search recipes by name
          </label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search recipes..."
            className="min-h-11 w-full rounded border border-stone-300 bg-white px-3 sm:w-64 focus-visible:outline-2 focus-visible:outline-stone-800"
          />
          <button
            type="submit"
            className="min-h-11 rounded bg-stone-800 px-4 font-semibold text-white hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800"
          >
            Search
          </button>
        </form>

        <Link to="/favorites" className="text-stone-700 hover:text-stone-900">
          Favorites
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
