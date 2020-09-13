import React, { useEffect } from "react";
import { Alltag } from "../redux/allactions/tagsactions/Alltagsaction.js";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container } from "reactstrap";
import Header from "./Navbar";
const Tagtags = () => {
  const { loading, alltag } = useSelector((state) => ({
    loading: state.Alltagreducer.loading,
    alltag: state.Alltagreducer.alltag,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Alltag());
  }, [dispatch]);

  return (
    <div className="main_tags">
      <div className="catag">
        <Header></Header>
      </div>
      <Container>
        {loading ? (
          <Col className="load"> loading...</Col>
        ) : (
          <>
            {alltag !== null && (
              <Row>
                {alltag
                  .slice(0)
                  .sort(
                    (item, index) =>
                      new Date(index.created_at) - new Date(item.created_at)
                  )
                  .map((item, index) => (
                    <ul key={index}>
                      <Button color="info">#{item.title}</Button>
                    </ul>
                  ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Tagtags;
