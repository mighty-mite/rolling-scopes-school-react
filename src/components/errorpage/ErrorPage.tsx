import "./ErrorPage.css";

import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="container">
      <h2 className="error__heading">Page not found</h2>
      <Link className="error__link" to="/">
        Go back to the main page
      </Link>
    </section>
  );
}

export default ErrorPage;
