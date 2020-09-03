import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormGroup, Input, Col, Container } from "reactstrap";
import { Button } from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signinUser } from "../redux/allactions/authaction/Loginaction.js";

const schema = Yup.object().shape({
  identifier: Yup.string().required("*Username is a required field"),
  password: Yup.string().required("*Password is a required field"),
});

const Login = () => {
  const { register, control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = ({ identifier, password }) => {
    dispatch(signinUser({ identifier, password, history }));
  };

  return (
    <>
      <Col className="home">
        <Col className="form" sm="4">
          <img
            src="https://www.lifewire.com/thmb/VPHk1hVtwFOti3iQPueGU9LgHsQ=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Blogger.svg-57f268d63df78c690fe5d003.png"
            alt=""
            width="50px"
            height="50px"
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
                Sign In
              </Button>

              <Col>
                Don't have an account?
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
