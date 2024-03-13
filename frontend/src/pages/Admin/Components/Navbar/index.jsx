import React from "react";
import Logo from "./Logo";
import Menus from "./Menus";
import NavbarSide from "./NavbarSide";

function Index(props) {
  return (
    <div
      style={{ height: "80px", backgroundColor: "#1E2328" }}
      className="d-flex header"
    > 
      <Logo />
      <div className="navbar_left_box">
        <Menus />
        <NavbarSide />
      </div>
    </div>
  );
}

export default Index;
