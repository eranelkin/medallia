import React from "react";
import Link from "@mui/material/Link";

import "./errorpage.scss";

const ErrorPage = () => {
  return (
    <section className="section">
      <h1>404</h1>
      <h3>Page not found</h3>
      <Link href="/">Home page</Link>
    </section>
  );
};

export default ErrorPage;
