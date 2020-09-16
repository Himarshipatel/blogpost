import React, { useState, useEffect } from "react";

import { Allpost } from "../redux/allactions/postactions/Allpostaction.js";
import { Singlepost } from "../redux/allactions/postactions/Singlepostaction.js";
import { Deletepost } from "../redux/allactions/postactions/Deletepostaction.js";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Row, Table, Button, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Postmodal from "./Postmodal.js";

import Header from "./Header.js";
import SweetAlert from "react-bootstrap-sweetalert";
const Posts = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [action, setAction] = useState();
  const [sweetalert, setAlert] = useState();
  const { loading, allpost } = useSelector((state) => ({
    loading: state.Allpostreducer.loading,
    allpost: state.Allpostreducer.allpost,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Allpost());
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
          dispatch(Deletepost(id));
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
              Add Post
            </Button>
          </Col>
        </Row>

        <>
          {loading ? (
            <Col className="load"> loading...</Col>
          ) : (
            <>
              {allpost !== null && (
                <Table bordered responsive className="post_tabel">
                  <thead className="tablehead">
                    <tr>
                      <th>Title</th>
                      <th>Slug</th>
                      <th>Content</th>
                      <th>username</th>
                      <th>Categories</th>
                      <th>Tags</th>
                      <th>Created_At</th>
                      <th>Updated_At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allpost
                      .slice(0)
                      .sort(
                        (item, index) =>
                          new Date(index.created_at) - new Date(item.created_at)
                      )
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>{item.slug}</td>
                          <td>{item.content}</td>
                          <td> {item.user !== null && item.user.username}</td>
                          <td>
                            {item.categories.map((catagory) => (
                              <li>{catagory.title}</li>
                            ))}
                          </td>
                          <td>
                            {item.tags.map((tag) => (
                              <li>{tag.title}</li>
                            ))}
                          </td>
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
                                dispatch(Singlepost(item.id));
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
            <Postmodal
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

export default Posts;
