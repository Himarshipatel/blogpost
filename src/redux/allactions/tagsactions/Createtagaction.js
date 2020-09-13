import axios from "axios";
import { toast } from "react-toastify";
import { Alltag } from "./Alltagsaction.js";
export const Addtag = (title, slug, description, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "ADD_TAG_PENDING" });

    axios
      .post(
        "https://infblogdemo.herokuapp.com/tags",
        { title: title, slug: slug, description: description },
        authtoken
      )

      .then((res) => {
        dispatch(Alltag());
        dispatch({
          type: "ADD_TAG_SUCCESS",
          addtag: res.data,
        });

        setModal(false);
      })
      .catch((error) => {
        setModal(true);

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
