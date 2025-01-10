import React from 'react';
import Logo from './Logo'; // Ensure the path is correct
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          {/* Left Section: Logo */}
          <div className="navbar-left">
            <a href="/" className="navbar-brand" title="YHANGRY">
              <Logo />
            </a>
          </div>

          {/* Center Section: Menu Items */}
          <div className="navbar-center">
            <ul className="menu">
              <li>
                <a href="/booking/chefs" className="menu-item">
                  Browse Chefs
                </a>
              </li>
              <li>
                <a href="/reviews" className="menu-item">
                  Reviews
                </a>
              </li>
              <li>
                <a href="/gift" className="menu-item">
                  Gift
                </a>
              </li>
              <li>
                <a href="/booking/pricing-calculator" className="menu-item">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section: Buttons */}
          <div className="navbar-right">
            <a href="/booking/chef-register" className="btn btn-dark">
              Become Chef
            </a>
            <a href="/booking/quote" className="btn btn-primary">
              Find Chef
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
