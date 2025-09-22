import { useState } from 'react'
import './App.css'
import { Outlet, useLoaderData } from "react-router-dom";
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'


export async function loader() {
  // Could fetch site-wide settings here; returning static for now
  return { rootName: "ReadySetHire" };
}

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
