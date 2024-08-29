import React from "react";
import Navbar from "../Compoenets/NavBar";
import PropTypes from "prop-types";
import MenuPage from "../Pages/Menu";
import './Default.css'
import { MenuButtonContext } from "../context/MenuButtonContext";
export const DefaultLayout = ({ children }) => {
   const { collapsed } = React.useContext(MenuButtonContext);
  return (
    <div>
      <Navbar />
      <div className = 'layout-container'>
         <div style={{width: collapsed ? 80 : 256}}>
      <MenuPage />
      </div>
      <div className = 'content'>
      {children}
      </div>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};