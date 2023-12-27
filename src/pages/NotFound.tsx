import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <h2>404 Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to={"/"}>
      <button className="nav mt-12">Go to Home</button>
    </Link>
  </div>
);

export default NotFound;
