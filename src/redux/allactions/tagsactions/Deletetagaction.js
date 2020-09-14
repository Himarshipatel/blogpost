import axios from "axios";
import { toast } from "react-toastify";
import { Alltag } from "./Alltagsaction.js";

export const Deletetag = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "DELETE_TAG_PENDING" });

    axios
      .delete(`https://infblogdemo.herokuapp.com/tags/${id}`, authtoken)

      .then((res) => {
        dispatch(Alltag());
        dispatch({ type: "DELETE_TAG_SUCCESS" });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_TAG_FAILURE",
          message: error.message,
        });
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
