import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Singlepost } from "../redux/allactions/postactions/Singlepostaction.js";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Singlepost(id));
  }, [dispatch, id]);

  const { loading, singlepost } = useSelector((state) => ({
    loading: state.Singlepostreducer.loading,
    singlepost: state.Singlepostreducer.singlepost,
  }));

  console.log(singlepost);

  return (
    <>
      <Col>
        {loading ? (
          <Col className="load"> loading...</Col>
        ) : (
          <>
            {singlepost !== null && (
              <Col>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    height="300px"
                    src="https://3xeqv237cwc86flf14kmen8d-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/connected-technology.jpg"
                    alt=""
                  />

                  <CardBody>
                    {singlepost.categories.map((catagory, index) => (
                      <ul key={index}>{catagory.title}</ul>
                    ))}
                    {singlepost.tags.map((tags, index) => (
                      <ul key={index}>{tags.title}</ul>
                    ))}
                    <CardTitle>{singlepost.user.username}</CardTitle>
                    <Moment format="Do MMM YYYY">
                      {singlepost.created_at}
                    </Moment>
                    <CardSubtitle>{singlepost.title}</CardSubtitle>
                    <CardText>{singlepost.content}</CardText>
                  </CardBody>
                </Card>
              </Col>
            )}
          </>
        )}
      </Col>
    </>
  );
};

export default Post;
