import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormGroup, Input, Container, Button, Col } from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { signupUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const schema = Yup.object().shape({
  username: Yup.string().required("Name is a required field"),
  password: Yup.string()
    .min(8, "password must be 8 character")
    .required("Password is a required field"),
  email: Yup.string().email().required("email is a required field"),
});

const Register = () => {
  const { register, control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = ({ username, password, email }) => {
    dispatch(signupUser({ username, password, email, history }));
  };

  return (
    <>
      <Col className="home">
        <Col className="form" sm="5">
          <Col className="head">Sign Up</Col>

          <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Controller
                  placeholder="Enter Name"
                  as={Input}
                  type="text"
                  ref={register}
                  control={control}
                  name="username"
                />
                {errors.username && (
                  <p className="text-danger">* {errors.username.message}</p>
                )}
              </FormGroup>

              <FormGroup>
                <Controller
                  placeholder="Enter Password"
                  as={Input}
                  type="password"
                  ref={register}
                  control={control}
                  name="password"
                />
                {errors.password && (
                  <p className="text-danger">* {errors.password.message}</p>
                )}
              </FormGroup>
              <FormGroup>
                <Controller
                  placeholder="Enter email"
                  as={Input}
                  type="text"
                  ref={register}
                  control={control}
                  name="email"
                />
                {errors.email && (
                  <p className="text-danger">* {errors.email.message}</p>
                )}
              </FormGroup>
              <Button color="primary" type="submit" className="sign_in">
                Sign up
              </Button>
            </Form>
          </Container>
        </Col>
      </Col>
    </>
  );
};

export default Register;
