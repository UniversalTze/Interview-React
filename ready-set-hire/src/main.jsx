import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { loader as rootLoader } from './App';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import About from './pages/About';
import InterviewList, { loader as InterviewListLoader } from './pages/InterviewList';
import Home from "./pages/Home"
import ErrorFallback from './components/ErrorElement';
import QuestionList, { loader as QuestionLoader } from './pages/QuestionList';
import ApplicantList,{ loader as ApplicantLoader } from './pages/ApplicantList';
import InterviewAddEditForm, { loader as InterviewEditLoader, action as InterviewAddEditAction } from './pages/InterviewAddEditForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,  // same as getEffect() hook
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "interviews", element: <InterviewList />, loader: InterviewListLoader },
      { path: "interviews/:id/questions", element: <QuestionList />, loader: QuestionLoader },
      { path: "interviews/:id/applicants", element: <ApplicantList />, loader: ApplicantLoader },
      { path: "interviewedit/:id", element: <InterviewAddEditForm />, loader: InterviewEditLoader, action: InterviewAddEditAction },
      { path: "newinterview", element: <InterviewAddEditForm />, action: InterviewAddEditAction },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
