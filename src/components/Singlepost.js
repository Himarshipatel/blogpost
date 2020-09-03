import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Singlepost } from "../redux/allactions/postactions/Singlepostaction.js";
import { useParams } from "react-router-dom";
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
          <>{singlepost !== null && <Col>{singlepost.id}</Col>}</>
        )}
      </Col>
    </>
  );
};

export default Post;
