import axios from "axios";
import { toast } from "react-toastify";

export const signinUser = ({ identifier, password, history }) => {
  console.log(identifier, password);
  return (dispatch) => {
    dispatch({ type: "SIGN_IN_PENDING" });

    axios
      .post("https://infblogdemo.herokuapp.com/auth/local", {
        identifier,
        password,
      })

      .then((res) => {
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
        console.log(res.data.jwt);
        localStorage.setItem("username", res.data.user.username);
        history.push("/");
      })

      .catch((error) => {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
};
