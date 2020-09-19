import React, { useEffect } from "react";
import { Button, CardImg } from "reactstrap";
import { Card, CardText, CardTitle, CardSubtitle } from "reactstrap";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Allpost } from "../../redux/actions";
import Header from "../../components/Header.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCrown, faHeart } from "@fortawesome/free-solid-svg-icons";
import banner from "../../images/homebanner.jpg";
import user_profile from "../../images/user_profile.png";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Allpost());
  }, [dispatch]);

  const { loading, posts } = useSelector((state) => ({
    loading: state.PostsReducers.allPosts.loading,
    posts: state.PostsReducers.allPosts.posts,
  }));
  return (
    <>
      <Header />

      <img width="100%" height="380px" src={banner} alt=" " />

      <Col className="allpost">
        {loading ? (
          <Col className="load"> loading...</Col>
        ) : (
          <>
            <Col className="post_labell">All Posts</Col>
            {posts !== null && (
              <Col className="post">
                {posts
                  .slice(0)
                  .sort(
                    (item, index) =>
                      new Date(index.created_at) - new Date(item.created_at)
                  )
                  .map((item, index) => (
                    <Card className="dispaly_post">
                      <Row className="catagoryinline">
                        {item.categories.map((catagory, index) => (
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
                        <CardImg
                          src={
                            item.featured_media &&
                            `https://infblogdemo.herokuapp.com${item.featured_media.url}`
                          }
                          alt="image"
                          className="post_image"
                        />
                      </Col>
                      <CardText>
                        <Row>
                          {item.tags.map((tags, index) => (
                            <Col key={index} className="display_tag" sm="auto">
                              <FontAwesomeIcon
                                icon={faTag}
                                className="tag_icon"
                              />
                              {tags.title}
                            </Col>
                          ))}
                        </Row>
                      </CardText>

                      <CardTitle>
                        <img src={user_profile} alt="" className="user" />
                        <Col className="username text-left">
                          <Col className=" user_name text-left" sm="auto">
                            <Col className="userr text-left">
                              {item.user && item.user.username}
                              <FontAwesomeIcon
                                icon={faCrown}
                                className="admin_icon"
                              />
                            </Col>
                            <Col className="date text-left">
                              <Moment format="MMM DD">{item.created_at}</Moment>
                            </Col>
                          </Col>
                        </Col>
                      </CardTitle>
                      <CardSubtitle className="post_title text-left">
                        {item.title}
                      </CardSubtitle>

                      <CardText className="post_content">
                        {item.content}
                      </CardText>

                      <Col className="post_like">
                        <Link to={`${item.slug}/${item.id}`}>
                          <Button color="primary" className="readmore">
                            Read more
                          </Button>
                        </Link>
                        <FontAwesomeIcon icon={faHeart} className="like_icon" />
                      </Col>
                    </Card>
                  ))}
              </Col>
            )}
          </>
        )}
      </Col>
    </>
  );
};

export default Home;
