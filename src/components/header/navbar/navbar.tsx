import Menu from "./menu";

export default function Navbar() {

  return (
    <nav className={"navbar navbar-expand-lg fixed-top"}
         aria-label={"navbar"}>
      <div className={"container-fluid"}>
        <a className={"navbar-brand"} href={"/"}>Reverso</a>
        <button className={"navbar-toggler"}
                data-bs-target={"#offcanvasNavbar"}
                data-bs-toggle={"offcanvas"} type={"button"} aria-label={"navbar-toggler"} id={"navbar-toggler"}>
          <span className={"navbar-toggler-icon"}></span>
        </button>
      </div>
      <Menu/>
    </nav>
  )
}