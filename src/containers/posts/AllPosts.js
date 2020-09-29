import React, { useEffect } from "react";
import { Button, CardImg } from "reactstrap";
import { Card, CardText, CardTitle, CardSubtitle } from "reactstrap";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { allPost } from "../../redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCrown, faHeart } from "@fortawesome/free-solid-svg-icons";
import banner from "../../images/homebanner.jpg";
import user_profile from "../../images/user_profile.png";
import blogPost from "../../images/blogpost.png";
import travelPost from "../../images/travel.png";
import betterposts from "../../images/write-better-posts.webp";
import Layout from "../../components/Layout";
import SwiftSlider from "react-swift-slider";
const Home = () => {
  const data = [
    {
      id: "1",
      src: banner,
    },
    {
      id: "2",
      src: betterposts,
    },
    {
      id: "3",
      src: travelPost,
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allPost());
  }, [dispatch]);

  const { loading, posts } = useSelector((state) => ({
    loading: state.PostsReducers.allPosts.loading,
    posts: state.PostsReducers.allPosts.posts,
  }));
  return (
    <Layout>
      <SwiftSlider data={data} className="ban" showDots={false} />
      {/* <img width="100%" height="380px" src={banner} alt=" " /> */}

      <Col className="allpost">
        {loading ? (
          <Col className="load"> loading...</Col>
        ) : (
          <>
            <Col className="post-labell">All Posts</Col>
            {posts !== null && (
              <Col className="post">
                {posts
                  .slice(0)
                  .sort(
                    (item, index) =>
                      new Date(index.created_at) - new Date(item.created_at)
                  )
                  .map((item, index) => (
                    <Card className="dispaly-post">
                      <Row className="catagoryinline">
                        {item.categories.map((catagory, index) => (
                          <Col
                            key={index}
                            className="category-title"
                            size="sm"
                            sm="auto"
                          >
                            {catagory.title}
                          </Col>
                        ))}
                      </Row>
                      <Row>
                        <Col>
                          <CardImg
                            src={
                              item.featured_media
                                ? `https://infblogdemo.herokuapp.com${item.featured_media.url}`
                                : blogPost
                            }
                            alt="image"
                            className="post_image"
                          />
                        </Col>
                      </Row>
                      <CardText>
                        <Row>
                          {item.tags.map((tags, index) => (
                            <Col key={index} className="display-tag" sm="auto">
                              <FontAwesomeIcon
                                icon={faTag}
                                className="tagicon"
                              />
                              {tags.title}
                            </Col>
                          ))}
                        </Row>
                      </CardText>

                      <CardTitle>
                        <img src={user_profile} alt="" className="user" />
                        <Col className="username text-left">
                          <Col
                            className=" user_name text-left"
                            size="sm"
                            sm="auto"
                          >
                            <Col className="userr text-left">
                              {item.user && item.user.username}
                              <FontAwesomeIcon
                                icon={faCrown}
                                className="admin-icon"
                              />
                            </Col>
                            <Col className="date text-left" size="sm" sm="auto">
                              <Moment format="MMM DD">{item.created_at}</Moment>
                            </Col>
                          </Col>
                        </Col>
                      </CardTitle>
                      <CardSubtitle className="post-title text-left">
                        {item.title}
                      </CardSubtitle>

                      <CardText className="post-content">
                        {item.content.substring(0, 300) + "..."}
                      </CardText>
                      <Row>
                        <Col className="post-like">
                          <Link to={`${item.slug}/${item.id}`}>
                            <Button color="primary" className="readmore">
                              Read more
                            </Button>
                          </Link>
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="like-icon"
                          />
                        </Col>
                      </Row>
                    </Card>
                  ))}
              </Col>
            )}
          </>
        )}
      </Col>
    </Layout>
  );
};

export default Home;
