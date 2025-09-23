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
import QuestionAddEditForm , {loader as QuestionAddEditLoader, action as QuestionAddEditAction } from './pages/QuestionAddEditForm';
import ApplicantAddEditForm, {loader as ApplicantAddEditLoader, action as ApplicantAddEditAction } from './pages/ApplicantAddEditForm';
import TakeInterview, {loader as TakeInterviewLoader } from './pages/TakeInterview';

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
      { path: "interviews/edit/:id", element: <InterviewAddEditForm />, loader: InterviewEditLoader, action: InterviewAddEditAction },
      { path: "interviews/new", element: <InterviewAddEditForm />, action: InterviewAddEditAction },
      { path: "interviews/:interviewid/questions/new", element: <QuestionAddEditForm />, loader: QuestionAddEditLoader, action: QuestionAddEditAction },
      { path: "interviews/:interviewid/questions/:questionid/edit", element: <QuestionAddEditForm />, loader: QuestionAddEditLoader, action: QuestionAddEditAction },
      { path: "interviews/:interviewid/applicants/new", element: <ApplicantAddEditForm />, loader: ApplicantAddEditLoader, action: ApplicantAddEditAction },
      { path: "interviews/:interviewid/applicants/:applicantid/edit", element: <ApplicantAddEditForm />, loader: ApplicantAddEditLoader, action: ApplicantAddEditAction },
      { path: "interviews/:interviewid/applicants/:applicantid/take-interview", element: <TakeInterview />, loader: TakeInterviewLoader }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
