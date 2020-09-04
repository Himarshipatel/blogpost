import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Alltag } from "../redux/allactions/tagsactions/Alltagsaction.js";
import { Addtag } from "../redux/allactions/tagsactions/Createtagaction.js";
import { Deletetag } from "../redux/allactions/tagsactions/Deletetagaction.js";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSignOutAlt,
  faUserCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { Redirect, useHistory } from "react-router-dom";
const formSchema = Yup.object().shape({
  title: Yup.string().required("title is a required field"),
  slug: Yup.string().required("slug is a required field"),
  description: Yup.string().required("description is a required field"),
});
const Tags = (props) => {
  const { className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const { loading, alltag } = useSelector((state) => ({
    loading: state.Alltagreducer.loading,
    alltag: state.Alltagreducer.alltag,
  }));
  console.log(alltag);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Alltag());
  }, [dispatch]);
  const { register, control, errors, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = ({ title, slug, description }) => {
    console.log(title, slug, description);
    dispatch(Addtag({ title, slug, description, setModal }));
  };
  const removehandle = (id) => {
    dispatch(Deletetag(id));
  };
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create Tag</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="exampleText">Title</Label>
              <Controller
                as={Input}
                type="text"
                ref={register}
                control={control}
                name="title"
                defaultValue=""
              />
              {errors.title && (
                <div className="text-danger">* {errors.title.message}</div>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Slug</Label>
              <Controller
                as={Input}
                type="text"
                ref={register}
                control={control}
                name="slug"
                defaultValue=""
              />
              {errors.slug && (
                <div className="text-danger">* {errors.slug.message}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Controller
                as={Input}
                type="text"
                ref={register}
                control={control}
                name="description"
                defaultValue=""
              />

              {errors.description && (
                <div className="text-danger">
                  * {errors.description.message}
                </div>
              )}
            </FormGroup>
            <Button color="primary">
              <FontAwesomeIcon
                icon={faPaperPlane}
                color="white"
                className="carticon"
              />
              Save
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Col className="dashboard">
        <Button color="primary" onClick={toggle} className="addpaste">
          Add Tag
        </Button>

        <>
          {loading ? (
            <Col className="load"> loading...</Col>
          ) : (
            <>
              {alltag !== null && (
                <Table bordered responsive className="tabell">
                  <thead className="tablehead">
                    <tr>
                      <th>Title</th>
                      <th>Slug</th>
                      <th>Description</th>
                      <th>Created_At</th>
                      <th>Updated_At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alltag
                      .slice(0)
                      .sort(
                        (item, index) =>
                          new Date(index.created_at) - new Date(item.created_at)
                      )
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>{item.slug}</td>
                          <td>{item.description}</td>

                          <td>
                            <Moment format="Do MMM YY">
                              {item.created_at}
                            </Moment>
                          </td>
                          <td>
                            <Moment format="Do MMM YY">
                              {item.updated_at}
                            </Moment>
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="carticon"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure to delete this record?"
                                  )
                                ) {
                                  removehandle(item.id);
                                }
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </>
      </Col>
    </>
  );
};

export default Tags;
