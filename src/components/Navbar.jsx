import React from "react";
import { Link } from "react-router-dom";
import folderLogo from "../images/folderlogo.jpg";

const Navbar = ({ title }) => {
  return (
    <div className="d-flex align-items-center ms-5 mt-2">
      <Link className="text-decoration-none" to="/">
        <img
          src={folderLogo}
          width={80}
          height={80}
          style={{ objectFit: "cover" }}
        />
      </Link>
      <h3 className="ms-4">{title}</h3>
    </div>
  );
};

export default Navbar;
