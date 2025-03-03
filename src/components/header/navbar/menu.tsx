import React from 'react';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="offcanvas offcanvas-end" id="offcanvasNavbar" tabIndex={-1}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Reverso</h5>
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            type="button"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item" aria-label="Page d'accueil">
              <a href="/" className="nav-link active">
                <div className="material-symbols-outlined">home</div>
                <div>Accueil</div>
              </a>
            </li>
            <li className="nav-item" aria-label="Partie clients">
              <a href="/clients" className="nav-link active">
                <div className="material-symbols-outlined">contact_page</div>
                <div>Clients</div>
              </a>
            </li>
            <li className="nav-item" aria-label="Partie prospects">
              <a href="/prospects" className="nav-link active">
                <div className="material-symbols-outlined">perm_contact_calendar</div>
                <div>Prospects</div>
              </a>
            </li>
          </ul>
          <form className="d-flex mt-3" role="search">
            <input
              aria-label="Search"
              className="form-control me-2"
              type="search"
              placeholder="Rechercher..."
            />
            <button type="submit" className="btn btn-primary">
              Rechercher
            </button>
          </form>
          <hr/>
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item" aria-label="Page de connexion">
              <a href="." className="nav-link active">
                <div className="material-symbols-outlined">login</div>
                <div>Connexion</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}