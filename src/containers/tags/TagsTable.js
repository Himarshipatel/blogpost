import React, { useState, useEffect } from "react";

import { allTag } from "../../redux/actions";
import { singleTag } from "../../redux/actions";
import { deleteTag } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Table, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import SweetAlert from "react-bootstrap-sweetalert";

const TagsTabel = ({ setAction, toggle }) => {
  const [sweetalert, setAlert] = useState();

  const { loading, tagsData } = useSelector((state) => ({
    loading: state.TagsReducers.allTags.loading,
    tagsData: state.TagsReducers.allTags.tagsData,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allTag());
  }, [dispatch]);
  const editHandel = (id) => {
    dispatch(singleTag(id));
  };
  const removehandle = (id) => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => {
          dispatch(deleteTag(id));
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
              {tagsData !== null && (
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
                    {tagsData
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
                              className="edit-icon"
                              onClick={() => {
                                toggle();
                                setAction("edit");
                                editHandel(item.id);
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="delete-icon"
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

export default TagsTabel;
