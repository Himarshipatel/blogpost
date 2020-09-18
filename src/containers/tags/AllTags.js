import React, { useEffect } from "react";
import { Alltag } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container } from "reactstrap";
import Header from "../../components/Header.js";
const AllTags = () => {
  const { loading, tagsData } = useSelector((state) => ({
    loading: state.TagsReducers.allTags.loading,
    tagsData: state.TagsReducers.allTags.tagsData,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Alltag());
  }, [dispatch]);

  return (
    <>
      <Col className="catag">
        <Header></Header>
      </Col>
      <Container>
        {loading ? (
          <Col className="load"> loading...</Col>
        ) : (
          <>
            {tagsData !== null && (
              <Row>
                {tagsData
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
    </>
  );
};

export default AllTags;
