import React, { useState, useEffect } from "react";

import { Alltag } from "../redux/allactions/tagsactions/Alltagsaction.js";
import { Singletag } from "../redux/allactions/tagsactions/Singletagaction.js";
import { Deletetag } from "../redux/allactions/tagsactions/Deletetagaction.js";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Table, Button, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Tagmodal from "./Tagmodal.js";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";
import Header from "./Navbar";
const Tags = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [action, setAction] = useState();
  const [sweetalert, setAlert] = useState();
  const { loading, alltag } = useSelector((state) => ({
    loading: state.Alltagreducer.loading,
    alltag: state.Alltagreducer.alltag,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Alltag());
  }, [dispatch]);

  const removehandle = (id) => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => {
          dispatch(Deletetag(id));
          hideAlert();
        }}
        onCancel={() => hideAlert()}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>
    );
    setAlert(getAlert());
  };

  const hideAlert = () => {
    setAlert();
  };
  const tokenn = localStorage.getItem("token");

  return (
    <>
      {tokenn ? (
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
                              new Date(index.created_at) -
                              new Date(item.created_at)
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
                                {sweetalert}
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
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Tags;
