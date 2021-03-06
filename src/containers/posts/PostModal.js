import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Select from "react-select";
import { allCategory } from "../../redux/actions";
import { allTag } from "../../redux/actions";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
  Row,
  Form,
  Col,
  FormGroup,
} from "reactstrap";
import { addPost } from "../../redux/actions";
import { editPost } from "../../redux/actions";

const postSchema = yup.object().shape({
  title: yup.string().required("*Title is Required"),
  slug: yup.string().required("*Slug is Required"),
  content: yup.string().required("*Content is Required"),
});

const PostModal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(postSchema),
  });

  const dispatch = useDispatch();

  const { loading, post, allCategories, tagsData } = useSelector((state) => ({
    loading: state.PostsReducers.getSinglePost.loading,
    post: state.PostsReducers.getSinglePost.post,
    allCategories: state.CategoriesReducers.allCategories.allCategories,
    tagsData: state.TagsReducers.allTags.tagsData,
  }));

  const userid = localStorage.getItem("id");

  const onSubmit = (create) => {
    const user = userid;

    const createpost = { ...create, user };
    action === "create"
      ? dispatch(addPost(createpost, setModal))
      : dispatch(editPost(createpost, post.id, setModal));
  };
  useEffect(() => {
    dispatch(allCategory());
    dispatch(allTag());
  }, [dispatch]);

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {action === "create" ? "Create Post" : "Edit Post"}
        </ModalHeader>
        {loading ? (
          <Col>Loading...</Col>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Row>
                <Col md={4}>
                  <Label>Content</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="textarea"
                      name="content"
                      defaultValue={
                        action === "create" ? "" : post !== null && post.content
                      }
                      control={control}
                      ref={register}
                    />
                    {errors && errors.content && (
                      <span className="text-danger">
                        {errors.content.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label>Slug</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="slug"
                      control={control}
                      ref={register}
                      defaultValue={
                        action === "create" ? "" : post !== null && post.slug
                      }
                    />

                    {errors && errors.slug && (
                      <span className="text-danger">{errors.slug.message}</span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label>Title</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="title"
                      control={control}
                      ref={register}
                      defaultValue={
                        action === "create" ? "" : post !== null && post.title
                      }
                    />
                    {errors && errors.title && (
                      <span className="text-danger">
                        {errors.title.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Label>Categories</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Select}
                      options={allCategories}
                      getOptionLabel={(option) => option.title}
                      getOptionValue={(option) => option.title}
                      control={control}
                      name="categories"
                      isMulti
                      defaultValue={
                        action === "create"
                          ? ""
                          : post !== null && post.categories
                      }
                      ref={register}
                      className={
                        errors && errors.categories ? "is-invalid" : ""
                      }
                    />
                    {errors && errors.categories && (
                      <span className="text-danger">
                        {errors.categories.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Label>Tags</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Select}
                      options={tagsData}
                      getOptionLabel={(option) => option.title}
                      getOptionValue={(option) => option.title}
                      control={control}
                      name="tags"
                      isMulti
                      defaultValue={
                        action === "create" ? "" : post !== null && post.tags
                      }
                      ref={register}
                      className={errors && errors.tags ? "is-invalid" : ""}
                    />
                    {errors && errors.tags && (
                      <span className="text-danger">{errors.tags.message}</span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">
                {action === "create" ? "Save" : "Update Post"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default PostModal;
