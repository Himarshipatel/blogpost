import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Alltag } from "../redux/allactions/tagsactions/Alltagsaction.js";
import { Singletag } from "../redux/allactions/tagsactions/Singletagaction.js";
import { Deletetag } from "../redux/allactions/tagsactions/Deletetagaction.js";
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
  Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSignOutAlt,
  faUserCircle,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Tagmodal from "./Tagmodal.js";
import SweetAlert from "react-bootstrap-sweetalert";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { Redirect, useHistory } from "react-router-dom";
import Header from "./Navbar";
const Tags = (props) => {
  const { className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [action, setAction] = useState();

  const { loading, alltag } = useSelector((state) => ({
    loading: state.Alltagreducer.loading,
    alltag: state.Alltagreducer.alltag,
  }));
  console.log(alltag);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Alltag());
  }, [dispatch]);

  const removehandle = (id) => {
    dispatch(Deletetag(id));
  };
  return (
    <>
      <Header />
      <Col className="dashboard">
        <Row className="add_tag">
          <Col>
            <Button
              color="primary"
              onClick={() => {
                toggle();
                setAction("create");
              }}
            >
              Add Tag
            </Button>
          </Col>
        </Row>
        <>
          {loading ? (
            <Col className="load"> loading...</Col>
          ) : (
            <>
              {alltag !== null && (
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
                    {alltag
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
                                dispatch(Singletag(item.id));
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="carticon"
                              onClick={() => {
                                removehandle(item.id);
                              }}
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
            <Tagmodal
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

export default Tags;
