import axios from "axios";
import { toast } from "react-toastify";

export const signupUser = ({ username, password, email, history }) => {
  console.log(username, password, email);
  return (dispatch) => {
    dispatch({ type: "SIGN_UP_PENDING" });

    axios
      .post("https://infblogdemo.herokuapp.com/auth/local/register", {
        username,
        password,
        email,
      })

      .then((res) => {
        console.log(res);
        dispatch({ type: "SIGN_UP_SUCCESS", register: res.data.user });

        toast.success("SignUp Success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/");
      })

      .catch((error) => {
        toast.error("signup error", {
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
