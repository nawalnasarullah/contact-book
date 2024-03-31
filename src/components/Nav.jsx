import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Nav() {
  const { contactReducer } = useSelector((state) => state);
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            Contact Book
          </Link>

          {/* Contact Button */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* Total Contacts Badge */}
          <button
            type="button"
            className="btn btn-dark ms-auto"
            style={{ position: "relative" }}
          >
            Total Contacts
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {contactReducer.contacts.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
