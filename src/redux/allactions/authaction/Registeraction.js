import axios from "axios";
import { toast } from "react-toastify";

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
