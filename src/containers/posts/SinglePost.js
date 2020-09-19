import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import { getSinglePost } from "../../redux/actions";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { faTag, faCrown } from "@fortawesome/free-solid-svg-icons";

import { Card, CardText, CardTitle, CardSubtitle, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header.js";
import user_profile from "../../images/user_profile.png";
const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  const { loading, post } = useSelector((state) => ({
    loading: state.PostsReducers.getSinglePost.loading,
    post: state.PostsReducers.getSinglePost.post,
  }));

  return (
    <>
      <Header />
      <Col>
        {loading ? (
          <Col className="load"> loading...</Col>
        ) : (
          <>
            {post !== null && (
              <Col>
                <Card className="single_dispaly_post">
                  <CardTitle>
                    <img src={user_profile} alt="" className="user" />
                    <Col className="username text-left">
                      <Col className=" user_name text-left" sm="auto">
                        <Col className="userr text-left">
                          {post.user.username}
                          <FontAwesomeIcon
                            icon={faCrown}
                            className="admin_icon"
                          />
                        </Col>
                        <Col className="date text-left">
                          <Moment format="MMM DD">{post.created_at}</Moment>
                        </Col>
                      </Col>
                    </Col>
                  </CardTitle>
                  <Row className="catagoryinline">
                    {post.categories.map((catagory, index) => (
                      <Col
                        key={index}
                        className="category_title"
                        size="sm"
                        sm="auto"
                      >
                        {catagory.title}
                      </Col>
                    ))}
                  </Row>
                  <Col>
                    <img
                      width="100%"
                      height="350px"
                      src={
                        post.featured_media &&
                        `https://infblogdemo.herokuapp.com${post.featured_media.url}`
                      }
                      alt="load"
                    />
                  </Col>
                  <Row>
                    {post.tags.map((tags, index) => (
                      <Col key={index} className="display_tag" sm="auto">
                        <FontAwesomeIcon icon={faTag} className="tag_icon" />
                        {tags.title}
                      </Col>
                    ))}
                  </Row>

                  <CardSubtitle className="post_title  text-left">
                    {post.title}
                  </CardSubtitle>
                  <CardText className="singlepost_content">
                    {post.content}
                  </CardText>
                </Card>
              </Col>
            )}
          </>
        )}
      </Col>
    </>
  );
};

export default SinglePost;
