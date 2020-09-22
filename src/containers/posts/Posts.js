import React, { useState, useEffect } from "react";

import { allPost } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Row, Button, Col } from "reactstrap";
import PostModal from "./PostModal.js";
import PostsTabel from "./PostsTable.js";
import Layout from "../../components/Layout";
const Posts = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [action, setAction] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allPost());
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
              Add Post
            </Button>
          </Col>
        </Row>
        <Row>
          <PostsTabel setAction={setAction} toggle={toggle} />
        </Row>
        {modal && (
          <PostModal
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

export default Posts;
