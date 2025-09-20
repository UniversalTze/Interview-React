import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

  return ( // (no footer currently) (outlet is child component of current root that you want to show)
    <div className="App">
      <Header rootName={rootName} navLinks={navLinks} />
      <Outlet />
      <Footer />
    </div>
  );
}
