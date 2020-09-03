import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Allpost } from "../redux/allactions/postactions/Allpostaction.js";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Allpost());
  }, [dispatch]);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const username = localStorage.getItem("username");

  const { loading, allpost } = useSelector((state) => ({
    loading: state.Allpostreducer.loading,
    allpost: state.Allpostreducer.allpost,
  }));

  const logout = () => {};
  return (
    <>
      <Navbar light expand="md" className="nav">
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
              <NavLink href="/" className="text-white">
                Tags
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" className="text-white">
                posts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" className="text-white">
                catagories
              </NavLink>
            </NavItem>
          </Nav>
          {
            <NavbarText className="adminname text-white">
              <Link to="/login">
                <Button color="info" className="signinbut">
                  Sign In
                </Button>
              </Link>
              <FontAwesomeIcon
                icon={faUserCircle}
                color="white"
                className="usericon"
              />
              {username}
            </NavbarText>
          }
          <Button onClick={logout} title="logout" className="loggut">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              color="white"
              className="logouticon"
            />
          </Button>
        </Collapse>
      </Navbar>
      {/* -----------------------------------------Allpost------------------------------------------------- */}
      <Col>
        {loading ? (
          <Col className="load"> loading...</Col>
        ) : (
          <>
            {allpost !== null && (
              <Col>
                {allpost.slice(0).map((item, index) => (
                  <ul key={index}>
                    {item.title}
                    <br />
                    {item.slug}
                    <Link to={`post/${item.id}`}>Read more...</Link>
                    {item.categories.map((catagory, index) => (
                      <ul key={index}>{catagory.id}</ul>
                    ))}
                  </ul>
                ))}
              </Col>
            )}
          </>
        )}
      </Col>
    </>
  );
};

export default Home;
