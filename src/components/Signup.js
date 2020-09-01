import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormGroup, Input, Container, Button } from "reactstrap";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
const schema = Yup.object().shape({
  identifier: Yup.string().required("Name is a required field"),
  password: Yup.string().required("Password is a required field"),
  email: Yup.string().email().required("email is a required field"),
});

const Signup = () => {
  const { register, control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = ({ identifier, password, email }) => {
    console.log(identifier, password, email);
  };
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Controller
              placeholder="Enter Name"
              as={Input}
              type="text"
              ref={register}
              control={control}
              name="identifier"
            />
            {errors.identifier && (
              <p className="text-danger">* {errors.identifier.message}</p>
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
          <Button color="primary" type="submit" className="signbutton">
            Sign up
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Signup;
