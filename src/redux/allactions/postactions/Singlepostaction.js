import axios from "axios";
import { toast } from "react-toastify";

export const Singlepost = (id) => {
  console.log(id);
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "SINGLE_POST_PENDING" });

    axios
      .get(`https://infblogdemo.herokuapp.com/posts/${id}`, authtoken)

      .then((res) => {
        console.log(res);
        dispatch({ type: "SINGLE_POST_SUCCESS", singlepost: res.data });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("post error", {
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
