import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Allcategory } from "../redux/allactions/categoriesactions/Allcategories.js";
import { Deletecategory } from "../redux/allactions/categoriesactions/Deletecategory.js";
import { Singlecategory } from "../redux/allactions/categoriesactions/Singlecategory.js";

import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSignOutAlt,
  faUserCircle,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Categorymodal from "./Categorymodal.js";
import SweetAlert from "react-bootstrap-sweetalert";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { Redirect, useHistory } from "react-router-dom";
const Category = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [action, setAction] = useState();

  const { loading, allcategory } = useSelector((state) => ({
    loading: state.Allcategoryreducer.loading,
    allcategory: state.Allcategoryreducer.allcategory,
  }));
  console.log(allcategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Allcategory());
  }, [dispatch]);

  const removehandle = (id) => {
    dispatch(Deletecategory(id));
  };
  return (
    <>
      <Col className="dashboard">
        <Button
          color="primary"
          onClick={() => {
            toggle();
            setAction("create");
          }}
        >
          Add Category
        </Button>

        <>
          {loading ? (
            <Col className="load"> loading...</Col>
          ) : (
            <>
              {allcategory !== null && (
                <Table bordered responsive className="tabell">
                  <thead className="tablehead">
                    <tr>
                      <th>Title</th>
                      <th>Slug</th>
                      <th>Description</th>
                      <th>Created_At</th>
                      <th>Updated_At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allcategory
                      .slice(0)
                      .sort(
                        (item, index) =>
                          new Date(index.created_at) - new Date(item.created_at)
                      )
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>{item.slug}</td>
                          <td>{item.description}</td>

                          <td>
                            <Moment format="Do MMM YY">
                              {item.created_at}
                            </Moment>
                          </td>
                          <td>
                            <Moment format="Do MMM YY">
                              {item.updated_at}
                            </Moment>
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faPencilAlt}
                              onClick={() => {
                                toggle();
                                setAction("edit");
                                dispatch(Singlecategory(item.id));
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              onClick={() => {
                                removehandle(item.id);
                              }}
                              className="carticon"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
          {modal && (
            <Categorymodal
              modal={modal}
              action={action}
              setModal={setModal}
              toggle={toggle}
            />
          )}
        </>
      </Col>
    </>
  );
};

export default Category;
