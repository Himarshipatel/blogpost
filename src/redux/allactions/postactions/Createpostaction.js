import axios from "axios";
import { toast } from "react-toastify";
import { Allpost } from "./Allpostaction.js";
export const Addpost = (title, slug, content, setModal) => {
  console.log(title, slug, content);
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  console.log(authtoken);
  return (dispatch) => {
    dispatch({ type: "ADD_POST_PENDING" });

    axios
      .post(
        "https://infblogdemo.herokuapp.com/posts",
        { title: title, slug: slug, content: content },
        authtoken
      )

      .then((res) => {
        console.log(res);
        dispatch(Allpost());
        dispatch({
          type: "ADD_POST_SUCCESS",
          addpost: res.data,
        });
        console.log(res.data);
        setModal(false);
      })
      .catch((error) => {
        setModal(true);
        console.log(error);
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
