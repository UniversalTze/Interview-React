// Simple home page (may be added to if more time)
import React from 'react';

/**
 * Home component for the ReadySetHire application.
 *
 * Displays a simple landing page with the application name and description.
 * Intended to be extended in the future with AI-powered features.
 *
 * @component
 * @returns {JSX.Element} A simple home page layout
 */
const Home = () => {
  return (
    <div className="container mt-4">
      <h2>ReadySetHire</h2>
      <p>You're at the home page of an AI-powered Interview application built with React and Bootstrap.</p>
      <br/>
      <p> This was supposed to be where the AI feature went! :(</p>
    </div>
  );
};

export default Home;