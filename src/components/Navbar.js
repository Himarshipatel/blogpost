import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
  Row,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const username = localStorage.getItem("username");
  const tokenn = localStorage.getItem("token");
  console.log(tokenn);
  let history = useHistory();
  const logout = () => {
    const tokenn = localStorage.clear("token");
    if (tokenn === undefined) {
      history.push("/");
    } else {
      history.push("/");
    }
  };
  return (
    <div className="navbar">
      <Navbar light expand="md">
        <NavbarBrand>
          <img
            src="https://www.lifewire.com/thmb/VPHk1hVtwFOti3iQPueGU9LgHsQ=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Blogger.svg-57f268d63df78c690fe5d003.png"
            alt=""
            className="logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/" className="text-white">
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/categories_tags" className="text-white">
                catagories tag
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tag_tags" className="text-white">
                Tags
              </NavLink>
            </NavItem>
          </Nav>
          {
            <NavbarText className="adminname text-white">
              {!tokenn ? (
                <Link to="/login">
                  <Button color="info" className="signinbut">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <UncontrolledDropdown setActiveFromChild direction="down">
                  <DropdownToggle tag="a" className="nav-link">
                    <Col className="username">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        color="white"
                        className="usericon"
                      />
                      {username}
                    </Col>
                  </DropdownToggle>

                  {/* <Col className="username"> {username}</Col> */}

                  <DropdownMenu>
                    <DropdownItem href="/tag">Tags</DropdownItem>
                    <DropdownItem href="/category">Category</DropdownItem>
                    <DropdownItem href="/posts">Post</DropdownItem>
                    {tokenn ? (
                      <Button
                        onClick={logout}
                        title="logout"
                        className="logout"
                      >
                        {/* <FontAwesomeIcon
                          icon={faSignOutAlt}
                          color="white"
                          className="logouticon"
                        /> */}
                        logout
                      </Button>
                    ) : (
                      ""
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </NavbarText>
          }
          {/* {tokenn ? (
            <Button onClick={logout} title="logout" className="loggut">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                color="white"
                className="logouticon"
              />
            </Button>
          ) : (
            ""
          )} */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
