import React, { useEffect } from "react";
import { allCategory } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container } from "reactstrap";
import Layout from "../../components/Layout";

const AllCategories = () => {
  const { loading, allCategories } = useSelector((state) => ({
    loading: state.CategoriesReducers.allCategories.loading,
    allCategories: state.CategoriesReducers.allCategories.allCategories,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCategory());
  }, [dispatch]);

  return (
    <Layout>
      <Container className="category-list">
        {loading ? (
          <Col className="load"> loading...</Col>
        ) : (
          <>
            {allCategories !== null && (
              <Row>
                {allCategories
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
    </Layout>
  );
};

export default AllCategories;
