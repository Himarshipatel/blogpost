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
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import logo from "../images/logo.jpg";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const tokenn = localStorage.getItem("token");

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
    <>
      <Navbar light expand="md" className="menubar">
        <NavbarBrand>
          <img src={logo} alt="" className="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/" title="home" className="menulist">
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="/categories_tags"
                title="categories"
                className="menulist"
              >
                catagories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tag_tags" title="tags" className="menulist">
                Tags
              </NavLink>
            </NavItem>
          </Nav>
          {
            <NavbarText className="adminname">
              {!tokenn ? (
                <Link to="/login">
                  <Button color="info" className="signin">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <UncontrolledDropdown setActiveFromChild direction="down">
                  <DropdownToggle tag="a" className="nav-link">
                    <Col className="username-header">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="usericon"
                      />
                      {username}
                    </Col>
                  </DropdownToggle>

                  <DropdownMenu className="dropdown">
                    <Row className="menu">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="usericon"
                      />

                      {email}
                    </Row>

                    <Col className="drop-menu">
                      <DropdownItem href="/tag" title="tags">
                        Tags
                      </DropdownItem>
                      <DropdownItem href="/category" title="category">
                        Category
                      </DropdownItem>
                      <DropdownItem href="/posts" title="post">
                        Post
                      </DropdownItem>
                    </Col>

                    {tokenn ? (
                      <Col className="logout-dis">
                        <Button
                          outline
                          color="link"
                          onClick={logout}
                          title="logout"
                          className="logout"
                        >
                          Logout
                        </Button>
                      </Col>
                    ) : (
                      ""
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </NavbarText>
          }
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;
