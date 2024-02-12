import { Link, withRouter } from "react-router-dom";

import Cookies from "js-cookie";

import "./Header.css";

const Header = (props) => {
  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    const { history } = props;
    history.push("/login");
  };
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <h1 className="website-logo">Personal Finance Tracker</h1>
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="nav-link">
              Transactions
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <button
          type="button"
          className="logout-mobile-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <Link to="/">
            <li className="nav-menu-item-mobile">
              Dashboard
            </li>
          </Link>
          <Link to="/transactions">
            <li className="nav-menu-item-mobile">
              Transactions
            </li>
          </Link>
          
        </ul>
      </div>
    </nav>
  );
};
export default withRouter(Header);
