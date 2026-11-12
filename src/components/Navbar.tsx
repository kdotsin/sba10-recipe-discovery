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
    <header className="border-b border-line bg-paper">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="font-display text-xl font-bold text-ink">
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
            className="min-h-11 w-full rounded border border-line bg-white px-3 sm:w-64 focus-visible:outline-2 focus-visible:outline-paprika"
          />
          <button
            type="submit"
            className="min-h-11 rounded bg-paprika px-4 font-semibold text-white hover:bg-paprika-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paprika"
          >
            Search
          </button>
        </form>

        <Link to="/favorites" className="text-muted hover:text-paprika">
          Favorites
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
