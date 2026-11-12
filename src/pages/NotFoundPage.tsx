import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h1 className="font-display text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-muted">
        There's nothing at this address.{" "}
        <Link to="/" className="underline hover:text-paprika">
          Go back to the categories
        </Link>
        .
      </p>
    </section>
  );
}

export default NotFoundPage;
