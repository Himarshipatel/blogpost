import axios from "axios";
import { toast } from "react-toastify";
import { Allpost } from "./Allpostaction.js";
import swal from "sweetalert";
//import SweetAlert from "react-bootstrap-sweetalert";
export const Deletepost = (id) => {
  console.log(id);
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "DELETE_POST_PENDING" });

    axios
      .delete(`https://infblogdemo.herokuapp.com/posts/${id}`, authtoken)

      .then((res) => {
        dispatch(Allpost());
        dispatch({ type: "DELETE_POST_SUCCESS" });
        toast.success("successfully deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_POST_FAILURE",
          message: error.message,
        });
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
