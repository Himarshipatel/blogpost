import axios from "axios";
import { toast } from "react-toastify";
import { Allpost } from "./Allpostaction.js";
export const Editpost = (title, slug, content, id, setModal) => {
  console.log(title, slug, content, id);
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "EDIT_POST_PENDING" });
    axios
      .put(
        `https://infblogdemo.herokuapp.com/posts/${id}`,
        {
          title: title,
          slug: slug,
          content: content,
        },
        authtoken
      )

      .then((res) => {
        dispatch({
          type: "EDIT_POST_SUCCESS",
          editpost: res.data,
        });
        setModal(false);
        dispatch(Allpost());
        toast.success("successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        setModal(true);
        dispatch({
          type: "EDIT_POST_FAILURE",
        });
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
