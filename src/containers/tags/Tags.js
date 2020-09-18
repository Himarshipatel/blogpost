import React, { useState, useEffect } from "react";

import { Alltag } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import TagModal from "./TagModal.js";
import TagsTabel from "./TagsTable.js";
import Header from "../../components/Header.js";
const Tags = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [action, setAction] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Alltag());
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
              Add Tag
            </Button>
          </Col>
        </Row>
        <TagsTabel setAction={setAction} toggle={toggle} />
        {modal && (
          <TagModal
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

export default Tags;
