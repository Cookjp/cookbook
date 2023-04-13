import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Index from "./pages/Index";
import Recipe from "./pages/Recipe";

const routes: RouteObject[] = [
  {
    path: "/recipe/:slug",
    element: <Recipe />,
  },
];

const router = createBrowserRouter([
  ...routes,
  {
    path: "*",
    element: <Index />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
