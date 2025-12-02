import { Link, useLocation } from 'react-router-dom';

/**
 * Header component that renders a responsive navigation bar.
 *
 * Displays a brand link and a set of navigation links.
 * Highlights the active link based on the current route.
 * Uses Bootstrap classes for styling and responsiveness.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.rootName - The brand name displayed as the main link.
 * @param {Array<{ label: string, path: string }>} props.navLinks - Array of navigation links with label and path.
 * @returns {JSX.Element} A responsive header with navigation links.
 */
const Header = ({ rootName, navLinks }) => {
  const location = useLocation();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">{rootName}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {navLinks.map((link, index) => (
                <li className="nav-item" key={index}>
                  <Link 
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    to={link.path}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;