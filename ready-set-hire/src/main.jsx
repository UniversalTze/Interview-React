import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { loader as rootLoader } from "./App";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import About from "./components/About";
import InterviewList, { loader as InterviewListLoader } from './components/InterviewList';
import Home from "./components/Home"
import ErrorFallback from './components/ErrorElement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,  // same as getEffect() hook
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "interview", element: <InterviewList />, loader: InterviewListLoader },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
