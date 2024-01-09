import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "./index.scss";
import Index from "./pages/Index";
import Recipe from "./pages/Recipe";
import { AuthProvider } from "./admin/AuthProvider";
import LoginForm from "./admin/Login";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import Admin from "./admin/Admin";
import ShoppingList from "./pages/ShoppingList";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/recipe/:slug",
        element: <Recipe />,
      },
      {
        path: "/shopping-list",
        element: <ShoppingList />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/recipe/:slug",
        element: <Admin />,
      },
    ],
    errorElement: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
];

const router = createBrowserRouter([...routes]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
