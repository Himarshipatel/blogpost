import React, { useEffect } from "react";
import { Allcategory } from "../redux/allactions/categoriesactions/Allcategories.js";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container } from "reactstrap";
import Header from "./Header.js";
const Categoriestag = () => {
  const { loading, allcategory } = useSelector((state) => ({
    loading: state.Allcategoryreducer.loading,
    allcategory: state.Allcategoryreducer.allcategory,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Allcategory());
  }, [dispatch]);

  return (
    <div className="main_tag">
      <div className="catag">
        <Header></Header>
      </div>
      <div>
        <Container>
          {loading ? (
            <Col className="load"> loading...</Col>
          ) : (
            <>
              {allcategory !== null && (
                <Row>
                  {allcategory
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
    </div>
  );
};

export default Categoriestag;
