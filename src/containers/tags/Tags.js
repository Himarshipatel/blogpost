import React, { useState, useEffect } from "react";
import { allTag } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import TagModal from "./TagModal.js";
import TagsTabel from "./TagsTable.js";
import Layout from "../../components/Layout";
const Tags = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [action, setAction] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allTag());
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
              Add Tag
            </Button>
          </Col>
        </Row>
        <Row>
          <TagsTabel setAction={setAction} toggle={toggle} />
        </Row>
        {modal && (
          <TagModal
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

export default Tags;
