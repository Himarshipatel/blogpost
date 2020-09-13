import axios from "axios";
import { toast } from "react-toastify";

export const Singletag = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "SINGLE_TAG_PENDING" });

    axios
      .get(`https://infblogdemo.herokuapp.com/tags/${id}`, authtoken)

      .then((res) => {
        dispatch({
          type: "SINGLE_TAG_SUCCESS",
          singletag: res.data,
        });
      })
      .catch((error) => {
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
