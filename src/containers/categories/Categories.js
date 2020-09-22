import React, { useState, useEffect } from "react";
import { allCategory } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Row, Button, Col } from "reactstrap";
import CategoryModal from "./CategoryModal.js";
import CategoriesTabel from "./CategoriesTable";
import Layout from "../../components/Layout";
const Categories = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [action, setAction] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategory());
  }, [dispatch]);

  return (
    <Layout>
      <Col className="dashboard">
        <Row className="add-tag">
          <Col>
            <Button
              color="primary"
              onClick={() => {
                toggle();
                setAction("create");
              }}
            >
              Add Category
            </Button>
          </Col>
        </Row>
        <Row>
          <CategoriesTabel setAction={setAction} toggle={toggle} />
        </Row>
        {modal && (
          <CategoryModal
            modal={modal}
            action={action}
            setModal={setModal}
            toggle={toggle}
          />
        )}
      </Col>
    </Layout>
  );
};

export default Categories;
