import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Administration from "./components/Administration";
import Entries from "./components/Entries";
import Upload from "./components/Upload";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Home />
      </App>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "administration/",
    element: (
      <App>
        <Administration />
      </App>
    ),
  },
  {
    path: "entries/",
    element: (
      <App>
        <Entries />
      </App>
    ),
  },
  {
    path: "upload/",
    element: (
      <App>
        <Upload />
      </App>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="container mb-2">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
