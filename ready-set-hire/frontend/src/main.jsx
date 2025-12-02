import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css'

// Root App and loader
import App, { loader as rootLoader } from './App';

// Pages and their loaders/actions
import About from './pages/About';
import Home from "./pages/Home"
import QuestionList, { loader as QuestionLoader } from './pages/QuestionList';
import ApplicantList,{ loader as ApplicantLoader } from './pages/ApplicantList';
import InterviewList, { loader as InterviewListLoader } from './pages/InterviewList';

import InterviewAddEditForm, { loader as InterviewEditLoader, action as InterviewAddEditAction } from './pages/InterviewAddEditForm';
import QuestionAddEditForm , {loader as QuestionAddEditLoader, action as QuestionAddEditAction } from './pages/QuestionAddEditForm';
import ApplicantAddEditForm, {loader as ApplicantAddEditLoader, action as ApplicantAddEditAction } from './pages/ApplicantAddEditForm';

import TakeInterview, {loader as TakeInterviewLoader } from './pages/TakeInterview';
import TakeInterviewQuestions, {loader as TakeInterviewQuestionsLoader } from './pages/TakeInterviewQuestions';
import TakeInterviewThanks, {loader as TakeInterviewThanksLoader} from './pages/TakeInterviewThanks'
import ApplicantAnswer, {loader as ApplicantAnswerLoader} from './pages/ApplicantAnswers'

import ErrorFallback from './components/ErrorElement';


/**
 * Main router configuration for the application.
 * 
 * Uses `createBrowserRouter` from react-router-dom v6.4+.
 * Each route can define:
 * - `element`: Component to render
 * - `loader`: Fetches data before rendering component
 * - `action`: Handles form submissions or POST-like actions
 * - `errorElement`: Fallback UI for errors
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,  // same as getEffect() hook
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      // Interviews routes
      { path: "interviews", element: <InterviewList />, loader: InterviewListLoader },
      { path: "interviews/edit/:id", element: <InterviewAddEditForm />, loader: InterviewEditLoader, action: InterviewAddEditAction },
      { path: "interviews/new", element: <InterviewAddEditForm />, action: InterviewAddEditAction },

      // Question routes
      { path: "interviews/:id/questions", element: <QuestionList />, loader: QuestionLoader },
      { path: "interviews/:interviewid/questions/new", element: <QuestionAddEditForm />, loader: QuestionAddEditLoader, action: QuestionAddEditAction },
      { path: "interviews/:interviewid/questions/:questionid/edit", element: <QuestionAddEditForm />, loader: QuestionAddEditLoader, action: QuestionAddEditAction },

      // Applicant routes
      { path: "interviews/:id/applicants", element: <ApplicantList />, loader: ApplicantLoader },
      { path: "interviews/:interviewid/applicants/new", element: <ApplicantAddEditForm />, loader: ApplicantAddEditLoader, action: ApplicantAddEditAction },
      { path: "interviews/:interviewid/applicants/:applicantid/edit", element: <ApplicantAddEditForm />, loader: ApplicantAddEditLoader, action: ApplicantAddEditAction },
      
      // Take interview routes
      { path: "interviews/:interviewid/applicants/:applicantid/take-interview", element: <TakeInterview />, loader: TakeInterviewLoader },
      { path: "interviews/:interviewid/applicants/:applicantid/take-interview/question/:questionid", element: <TakeInterviewQuestions />, loader: TakeInterviewQuestionsLoader },
      { path: "interviews/:interviewid/applicants/:applicantid/complete-thanks", element: <TakeInterviewThanks />, loader: TakeInterviewThanksLoader },
      
      // Applicant Answer route
      { path: "interviews/:interviewid/applicants/:applicantid/answer", element: <ApplicantAnswer />, loader: ApplicantAnswerLoader } 
    ],
  },
]);


/**
 * Render the application using React 18 root API.
 * Wrap with <StrictMode> for highlighting potential problems.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
