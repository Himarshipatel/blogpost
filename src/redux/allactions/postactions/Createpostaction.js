import axios from "axios";
import { toast } from "react-toastify";
import { Allpost } from "./Allpostaction.js";
export const Addpost = (post, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "ADD_POST_PENDING" });

    axios
      .post(
        "https://infblogdemo.herokuapp.com/posts",

        post,

        authtoken
      )

      .then((res) => {
        dispatch(Allpost());
        dispatch({
          type: "ADD_POST_SUCCESS",
          addpost: res.data,
        });

        setModal(false);
      })
      .catch((error) => {
        setModal(true);

        toast.error(error.response.data.message, {
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
