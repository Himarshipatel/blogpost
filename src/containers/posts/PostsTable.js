import React, { useState, useEffect } from "react";

import { allPost } from "../../redux/actions";
import { getSinglePost } from "../../redux/actions";
import { deletePost } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Table, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SweetAlert from "react-bootstrap-sweetalert";
const PostsTabel = ({ setAction, toggle }) => {
  const [sweetalert, setAlert] = useState();

  const { loading, posts } = useSelector((state) => ({
    loading: state.PostsReducers.allPosts.loading,
    posts: state.PostsReducers.allPosts.posts,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allPost());
  }, [dispatch]);
  const editHandel = (id) => {
    dispatch(getSinglePost(id));
  };
  const removehandle = (id) => {
    const getAlert = () => (
      <SweetAlert
        className="sweetalertt"
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => {
          dispatch(deletePost(id));
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
      <Col className="dashboard">
        <>
          {loading ? (
            <Col className="load"> loading...</Col>
          ) : (
            <>
              {posts !== null && (
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
                    {posts
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
                              <ul>{catagory.title}</ul>
                            ))}
                          </td>
                          <td>
                            {item.tags.map((tag) => (
                              <ul>{tag.title}</ul>
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
                              className="editpost-icon"
                              onClick={() => {
                                toggle();
                                setAction("edit");
                                editHandel(item.id);
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="deletepost-icon"
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
        </>
      </Col>
    </>
  );
};

export default PostsTabel;
