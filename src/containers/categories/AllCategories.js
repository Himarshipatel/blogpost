import React, { useEffect } from "react";
import { allCategory } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container } from "reactstrap";
import Header from "../../components/Header.js";
const AllCategories = () => {
  const { loading, categoriesData } = useSelector((state) => ({
    loading: state.CategoriesReducers.allCategories.loading,
    categoriesData: state.CategoriesReducers.allCategories.categoriesData,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategory());
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
            {categoriesData !== null && (
              <Row>
                {categoriesData
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

export default AllCategories;
