import React from 'react';

/**
 * Footer component displayed at the bottom of the application.
 *
 * Renders a styled footer with the current year and the "ReadySetHire" brand name.
 * Uses Bootstrap utility classes for background, text color, spacing, and alignment.
 *
 * @component
 * @returns {JSX.Element} A footer section with branding text.
 */
const Footer = () => (
  <footer className="bg-secondary text-white text-center py-3 mt-4">
    <div className="container">
      <p className="mb-0">{`© ${new Date().getFullYear()} ReadySetHire`}</p>
    </div>
  </footer>
);

export default Footer;