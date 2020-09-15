import axios from "axios";
import { toast } from "react-toastify";

export const Singlepost = (id) => {
  // const tokenn = localStorage.getItem("token");
  // const authtoken = {
  //   headers: {
  //     Authorization: `Bearer ${tokenn}`,
  //   },
  // };
  return (dispatch) => {
    dispatch({ type: "SINGLE_POST_PENDING" });

    axios
      .get(`https://infblogdemo.herokuapp.com/posts/${id}`)

      .then((res) => {
        dispatch({ type: "SINGLE_POST_SUCCESS", singlepost: res.data });
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
