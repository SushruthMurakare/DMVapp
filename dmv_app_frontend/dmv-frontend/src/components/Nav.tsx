import React from "react";
import { colors, fonts } from "../styles/theme";
import { Link } from "react-router-dom";


const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "30px",
  padding: "20px 40px",
  color: colors.secondary,
  fontFamily: fonts.body,
};

const Nav: React.FC = () => {
  return (
     <nav style={navStyle}>
    <Link to="/" style={{ color: colors.secondary, textDecoration: "none", fontWeight: 600 }}>
        Home
      </Link>
      <Link to="/sections" style={{ color: colors.secondary, textDecoration: "none", fontWeight: 600 }}>
        Sections
      </Link>
      <Link to="/reviews" style={{ color: colors.secondary, textDecoration: "none", fontWeight: 600 }}>
        Reviews
      </Link>
        <Link to="/reviews" style={{ color: colors.secondary, textDecoration: "none", fontWeight: 600 }}>
        Q&A
      </Link>
    </nav>
  );
};

export default Nav;
