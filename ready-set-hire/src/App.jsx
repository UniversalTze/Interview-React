import { useState } from 'react'
import './App.css'
import { Outlet, useLoaderData } from "react-router-dom";
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

/**
 * Loader function for the root route.
 * Could be extended to fetch site-wide settings, user info, or config.
 * Currently returns a static rootName.
 *
 * @async
 * @function loader
 * @returns {Promise<Object>} - Object containing rootName for the app
 */
export async function loader() {
  // Could fetch site-wide settings here; returning static for now
  return { rootName: "ReadySetHire" };
}

/**
 * Root App component.
 * 
 * Renders the main layout including Header, dynamic Outlet (child route content),
 * and Footer. Uses flexbox to push footer to the bottom.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
export default function App() {
  const { rootName } = useLoaderData();
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/interviews", label: "Interview" }
  ];

  return ( // (outlet is child component of current root that you want to show)
    <div className="App d-flex flex-column min-vh-100">  {/* Create a flex box so that footer can be pushed down */}
      <Header rootName={rootName} navLinks={navLinks} />
       <main className="flex-grow-1">   {/* expands to push footer down */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
