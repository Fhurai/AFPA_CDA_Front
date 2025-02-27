import React from 'react';
import Menu from "./menu";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg fixed-top"
        aria-controls="navbar"
        aria-label="navbar"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Reverso</a>
          <button
            className="navbar-toggler"
            data-bs-target="#offcanvasNavbar"
            data-bs-toggle="offcanvas"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <Menu />
      </nav>
    );
  }
}