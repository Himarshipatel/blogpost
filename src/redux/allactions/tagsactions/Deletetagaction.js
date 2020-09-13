import axios from "axios";
import { toast } from "react-toastify";
import { Alltag } from "./Alltagsaction.js";
import swal from "sweetalert";
//import SweetAlert from "react-bootstrap-sweetalert";
export const Deletetag = (id) => {
  console.log(id);
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "DELETE_TAG_PENDING" });

    axios.delete(`https://infblogdemo.herokuapp.com/tags/${id}`, authtoken);
    swal({
      title: "Are you sure?",
      text: "It will permanently deleted !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((res) => {
        dispatch(Alltag());
        dispatch({ type: "DELETE_TAG_SUCCESS" });
        // toast.success("successfully deleted", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        swal("Deleted!", "Your file has been deleted.", "success");
        // if (res) {
        //   swal("Deleted!");
        // }
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
