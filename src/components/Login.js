import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormGroup, Input, Col, Container } from "reactstrap";
import { Button } from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { Link } from "react-router-dom";
const schema = Yup.object().shape({
  identifier: Yup.string().required("*Username is a required field"),
  password: Yup.string().required("*Password is a required field"),
});

const Login = () => {
  const { register, control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = ({ identifier, password }) => {
    console.log(identifier, password);
  };
  return (
    <>
      <Col className="home">
        <Col className="form" sm="5">
          <img
            src="https://icons-for-free.com/iconfiles/png/512/avatar+human+male+man+people+person+profile+user+users+icon-1320190727966457290.png"
            alt=""
            width="50px"
            height="50px"
            className="avtar"
          />
          <Col className="head">Login</Col>
          <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Controller
                  placeholder="Enter username"
                  as={Input}
                  ref={register}
                  control={control}
                  name="identifier"
                />
                {errors.identifier && (
                  <div className="text-danger">{errors.identifier.message}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Controller
                  placeholder="Enter password"
                  as={Input}
                  type="password"
                  ref={register}
                  control={control}
                  name="password"
                  defaultValue=""
                />
                {errors.password && (
                  <div className="text-danger">{errors.password.message}</div>
                )}
              </FormGroup>

              <Button color="primary" className="signbutton">
                Login
              </Button>
              <Col>
                Don' have an account?
                <Link to="/register"> SignUp</Link>
              </Col>
            </Form>
          </Container>
        </Col>
      </Col>
    </>
  );
};

export default Login;
