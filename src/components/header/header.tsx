import React from 'react';
import Navbar from "./navbar/navbar";

export default class Header extends React.Component {
  render() {
    return (
      <header className="header" aria-label="Header">
        <Navbar/>
      </header>
    );
  }
}