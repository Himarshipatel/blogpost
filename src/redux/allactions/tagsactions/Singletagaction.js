import axios from "axios";
import { toast } from "react-toastify";

export const Singletag = (id) => {
  console.log(id);
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
        console.log(res);
        dispatch({
          type: "SINGLE_TAG_SUCCESS",
          singletag: res.data,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("singletag error", {
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
