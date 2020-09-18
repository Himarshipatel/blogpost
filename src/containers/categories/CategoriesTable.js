import React, { useState, useEffect } from "react";

import { allCategory } from "../../redux/actions";
import { Deletecategory } from "../../redux/actions";
import { Singlecategory } from "../../redux/actions";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Table, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CategoriesTabel = ({ setAction, toggle }) => {
  const [sweetalert, setAlert] = useState();
  const { loading, categoriesData } = useSelector((state) => ({
    loading: state.CategoriesReducers.allCategories.loading,
    categoriesData: state.CategoriesReducers.allCategories.categoriesData,
  }));
  console.log(categoriesData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategory());
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
          dispatch(Deletecategory(id));
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
              {categoriesData !== null && (
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
                    {categoriesData
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
