import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
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
        path: "/login",
        element: <LoginForm />,
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
