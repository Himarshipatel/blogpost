import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Select from "react-select";
import { allCategory } from "../../redux/actions";
import { Alltag } from "../../redux/actions";

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
import { Addpost } from "../../redux/actions";
import { Editpost } from "../../redux/actions";

const formSchema = yup.object().shape({
  title: yup.string().required("*Title is Required"),
  slug: yup.string().required("*Slug is Required"),
  content: yup.string().required("*Content is Required"),
});

const PostModal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const dispatch = useDispatch();

  const { loading, singlepost, allcategory, alltag } = useSelector((state) => ({
    loading: state.PostsReducers.loading,
    singlepost: state.PostsReducers.singlepost,
    allcategory: state.CategoriesReducers.allcategory,
    alltag: state.TagsReducers.alltag,
  }));

  const userid = localStorage.getItem("id");

  const onSubmit = (post) => {
    const user = userid;

    const createpost = { ...post, user };
    action === "create"
      ? dispatch(Addpost(createpost, setModal))
      : dispatch(Editpost(createpost, singlepost.id, setModal));
  };
  useEffect(() => {
    dispatch(allCategory());
    dispatch(Alltag());
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
                        action === "create"
                          ? ""
                          : singlepost !== null && singlepost.content
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
                        action === "create"
                          ? ""
                          : singlepost !== null && singlepost.slug
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
                        action === "create"
                          ? ""
                          : singlepost !== null && singlepost.title
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
                      options={
                        allcategory !== null &&
                        allcategory.map((item) => ({
                          id: item.id,

                          value: item.title,
                          label: item.title,
                        }))
                      }
                      control={control}
                      name="categories"
                      isMulti
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null &&
                            singlepost.categories.map((item) => ({
                              id: item.id,
                              label: item.title,
                              value: item.title,
                            }))
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
                      options={
                        alltag !== null &&
                        alltag.map((item) => ({
                          id: item.id,
                          label: item.title,
                          value: item.title,
                        }))
                      }
                      control={control}
                      name="tags"
                      isMulti
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null &&
                            singlepost.tags.map((item) => ({
                              id: item.id,
                              label: item.title,
                              value: item.title,
                            }))
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
