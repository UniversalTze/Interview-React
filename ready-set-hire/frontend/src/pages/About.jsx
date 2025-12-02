// Simple about page
import React from 'react';

/**
 * About component that displays information about the ReadySetHire application.
 *
 * @component
 * @returns {JSX.Element} A simple container with app name and description.
 */
const About = () => {
  return (
    <div className="container mt-4">
      <h2>ReadySetHire</h2>
      <p>This is an AI-powered Interview application built with React and Bootstrap.</p>
    </div>
  );
};

export default About;