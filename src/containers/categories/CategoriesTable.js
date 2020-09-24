import React, { useState, useEffect } from "react";

import { allCategory } from "../../redux/actions";
import { deleteCategory } from "../../redux/actions";
import { singleCategory } from "../../redux/actions";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Table, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CategoriesTabel = ({ setAction, toggle }) => {
  const [sweetalert, setAlert] = useState();
  const { loading, allCategories } = useSelector((state) => ({
    loading: state.CategoriesReducers.allCategories.loading,
    allCategories: state.CategoriesReducers.allCategories.allCategories,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategory());
  }, [dispatch]);
  const editHandel = (id) => {
    dispatch(singleCategory(id));
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
          dispatch(deleteCategory(id));
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
              {allCategories !== null && (
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
                    {allCategories
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
                              className="delete-icon"
                              icon={faTrashAlt}
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

export default CategoriesTabel;
