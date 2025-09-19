import React from 'react';

const Footer = () => (
  <footer className="bg-secondary text-white text-center py-3 mt-4">
    <div className="container">
      <p className="mb-0">{`© ${new Date().getFullYear()} ReadySetHire`}</p>
    </div>
  </footer>
);

export default Footer;