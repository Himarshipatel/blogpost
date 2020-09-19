import axios from "axios";
import { toast } from "react-toastify";

export const signinUser = ({ identifier, password, history }) => {
  return (dispatch) => {
    dispatch({ type: "SIGN_IN_PENDING" });

    axios
      .post("https://infblogdemo.herokuapp.com/auth/local", {
        identifier,
        password,
      })

      .then((res) => {
        localStorage.setItem("id", res.data.user.id);

        dispatch({ type: "SIGN_IN_SUCCESS", login: res.data.user });

        toast.success(`welcome ${res.data.user.username}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        localStorage.setItem("token", res.data.jwt);

        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("email", res.data.user.email);

        history.push("/");
      })

      .catch((error) => {
        dispatch({ type: "SIGN_IN_FAILURE", message: error.message });

        error.response.data.message.map((error) =>
          error.messages.map((item) =>
            toast.error(item.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          )
        );
      });
  };
};

export const signupUser = ({ username, password, email, history }) => {
  return (dispatch) => {
    dispatch({ type: "SIGN_UP_PENDING" });

    axios
      .post("https://infblogdemo.herokuapp.com/auth/local/register", {
        username,
        password,
        email,
      })

      .then((res) => {
        dispatch({ type: "SIGN_UP_SUCCESS" });

        toast.success("SignUp Success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/login");
      })

      .catch((error) => {
        dispatch({ type: "SIGN_UP_FAILURE", message: error.message });

        error.response.data.message.map((error) =>
          error.messages.map((item) =>
            toast.error(item.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          )
        );
      });
  };
};
