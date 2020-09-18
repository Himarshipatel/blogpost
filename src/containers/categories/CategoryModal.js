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
import { Addcategory } from "../../redux/actions";
import { updateCategory } from "../../redux/actions";
const formSchema = yup.object().shape({
  title: yup.string().required("*Title is Required"),
  slug: yup.string().required("*Slug is Required"),
  description: yup.string().required("*Description is Required"),
});

const CategoryModal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const dispatch = useDispatch();

  const { loading, category } = useSelector((state) => ({
    loading: state.CategoriesReducers.getSingleCategory.loading,
    category: state.CategoriesReducers.getSingleCategory.category,
  }));

  const onSubmit = (data) => {
    action === "create"
      ? dispatch(Addcategory(data, setModal))
      : dispatch(updateCategory(data, category.id, setModal));
    console.log(category.id);
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {action === "create" ? "Create Category" : "Edit Category"}
        </ModalHeader>
        {loading ? (
          <Col>Loading...</Col>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
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
                          : category !== null && category.title
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
                          : category !== null && category.slug
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
                  <Label>Description</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="description"
                      defaultValue={
                        action === "create"
                          ? ""
                          : category !== null && category.description
                      }
                      control={control}
                      ref={register}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">
                {action === "create" ? "Save" : "Update Category"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default CategoryModal;
