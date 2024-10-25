import { Link } from "react-router-dom";

interface HeaderProps {
  cartCount: number;
}

function Header({ cartCount }: HeaderProps) {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#2c3e50" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "#ecf0f1" }}>
          Market Foro
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ color: "#ecf0f1" }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{ color: "#ecf0f1" }}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros" style={{ color: "#ecf0f1" }}>
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sucursales" style={{ color: "#ecf0f1" }}>
                Sucursales
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <div className="me-3">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
              />
            </div>
            <button className="btn btn-outline-light me-3">Buscar</button>
            <Link className="nav-link" to="/carrito" style={{ color: "#ecf0f1", display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-shopping-cart"></i>
              {cartCount > 0 && (
                <span className="badge bg-danger ms-2">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
