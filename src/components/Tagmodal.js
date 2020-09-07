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
import { Addtag } from "../redux/allactions/tagsactions/Createtagaction.js";
import { Edittag } from "../redux/allactions/tagsactions/Edittagaction.js";

const formSchema = yup.object().shape({
  title: yup.string().required("*Title is Required"),
  slug: yup.string().required("*Slug is Required"),
  description: yup.string().required("*Description is Required"),
});

const Tagmodal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const dispatch = useDispatch();

  const { loading, singletag } = useSelector((state) => ({
    loading: state.singletagreducer.loading,
    singletag: state.singletagreducer.singletag,
  }));
  console.log(singletag);
  const onSubmit = (tag) => {
    console.log(tag);
    action === "create"
      ? dispatch(Addtag(tag.title, tag.slug, tag.description, setModal))
      : dispatch(
          Edittag(tag.title, tag.slug, tag.description, singletag.id, setModal)
        );
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {action === "create" ? "Create Tag" : "Edit Tag"}
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
                      name="description"
                      defaultValue={
                        action === "create"
                          ? ""
                          : singletag !== null && singletag.description
                      }
                      control={control}
                      ref={register}
                      placeholder="Description...."
                    />
                    {errors && errors.description && (
                      <span className="text-danger">
                        {errors.description.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label>Tag Slug</Label>
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
                          : singletag !== null && singletag.slug
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
                  <Label> Tag Title</Label>
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
                          : singletag !== null && singletag.title
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
                {action === "create" ? "Save" : "Update Tag"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Tagmodal;
