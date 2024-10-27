import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { logout } from "../features/user/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header>
      <div className="top-header pt-1 px-4">
        <ul className="d-flex gap-3 justify-content-end align-content-center list-unstyled mb-0 ">
          <li>Help</li>
          <li>Orders & Returns</li>
          <li className="text-capitalize">
            {user ? `Hi, ${user?.username}` : <Link to="/login">Login</Link>}
          </li>
          {user && (
            <li className="custom-tooltip">
              <RiLogoutCircleRFill size={25} />
              <button
                className="btn btn-dark tooltiptext"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      <nav className="navbar navbar-expand-lg  w-100 py-0">
        <div className="container-fluid ">
          {/* Brand on the left */}
          <Link to="/" className="navbar-brand text-uppercase fw-bold fs-3">
            Ecommerce
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarNav">
            {/* Centered Links */}
            <ul className="navbar-nav w-100 d-lg-flex gap-lg-4 justify-content-lg-center  align-items-lg-center">
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link fw-semibold">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/sale" className="nav-link fw-semibold">
                  Sale
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/clearance" className="nav-link fw-semibold">
                  Clearance
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/new-stock" className="nav-link fw-semibold">
                  New Stock
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/trending" className="nav-link fw-semibold">
                  Trending
                </NavLink>
              </li>
            </ul>

            {/* Icons on the right */}
            <div className="d-flex align-items-center">
              <button className="btn">
                <IoIosSearch size={20} />
              </button>
              <button className="btn">
                <FiShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
