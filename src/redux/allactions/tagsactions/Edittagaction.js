import axios from "axios";
import { toast } from "react-toastify";
import { Alltag } from "./Alltagsaction.js";
export const Edittag = (tag, id, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "EDIT_TAG_PENDING" });
    axios
      .put(`https://infblogdemo.herokuapp.com/tags/${id}`, tag, authtoken)

      .then((res) => {
        dispatch({
          type: "EDIT_TAG_SUCCESS",
          edittag: res.data,
        });
        setModal(false);
        dispatch(Alltag());
        toast.success("successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        setModal(true);
        dispatch({
          type: "EDIT_TAG_FAILURE",
        });
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
