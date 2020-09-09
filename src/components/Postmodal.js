import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
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
import { Addpost } from "../redux/allactions/postactions/Createpostaction.js";
import { Editpost } from "../redux/allactions/postactions/Editpostaction.js";

const formSchema = yup.object().shape({
  title: yup.string().required("*Title is Required"),
  slug: yup.string().required("*Slug is Required"),
  content: yup.string().required("*Content is Required"),
});

const Postmodal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const dispatch = useDispatch();

  const { loading, singlepost } = useSelector((state) => ({
    loading: state.Singlepostreducer.loading,
    singlepost: state.Singlepostreducer.singlepost,
  }));
  console.log(singlepost);
  const onSubmit = (post) => {
    console.log(post);
    action === "create"
      ? dispatch(Addpost(post.title, post.slug, post.content, setModal))
      : dispatch(
          Editpost(post.title, post.slug, post.content, singlepost.id, setModal)
        );
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {action === "create" ? "Create Post" : "Edit Post"}
        </ModalHeader>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="content"
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null && singlepost.content
                      }
                      control={control}
                      ref={register}
                      placeholder="Content...."
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
                  <Label>Post Slug</Label>
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
                  <Label> Post Title</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="title"
                      placeholder="Enter Tag Title"
                      defaultValue=""
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

export default Postmodal;
