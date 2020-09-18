import React, { useState, useEffect } from "react";
import { Allcategory } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Row, Button, Col } from "reactstrap";
import CategoryModal from "./CategoryModal.js";
import CategoriesTabel from "./CategoriesTable";
import Header from "../../components/Header.js";
const Categories = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [action, setAction] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Allcategory());
  }, [dispatch]);

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
              Add Category
            </Button>
          </Col>
        </Row>
        <CategoriesTabel setAction={setAction} toggle={toggle} />

        {modal && (
          <CategoryModal
            modal={modal}
            action={action}
            setModal={setModal}
            toggle={toggle}
          />
        )}
      </Col>
    </>
  );
};

export default Categories;
