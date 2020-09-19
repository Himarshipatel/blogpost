import axios from "axios";
import { toast } from "react-toastify";

export const Allpost = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_POST_PENDING" });

    axios
      .get("https://infblogdemo.herokuapp.com/posts")

      .then((res) => {
        dispatch({
          type: "ALL_POST_SUCCESS",
          posts: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ALL_POST_FAILURE",
          message: error.message,
        });
      });
  };
};
export const Addpost = (post, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "ADD_POST_PENDING" });

    axios
      .post(
        "https://infblogdemo.herokuapp.com/posts",

        post,

        authtoken
      )

      .then((res) => {
        dispatch(Allpost());
        dispatch({
          type: "ADD_POST_SUCCESS",
          addpost: res.data,
        });
        toast.success("Create Post Success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setModal(false);
      })
      .catch((error) => {
        dispatch({
          type: "ADD_POST_FAILURE",
          message: error.message,
        });
        for (const a in error.response.data.data.errors) {
          error.response.data.data.errors[a].map((error) =>
            toast.error(error, {
              position: toast.POSITION.TOP_CENTER,
            })
          );
        }
      });
  };
};

export const Deletepost = (id) => {
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
export const Editpost = (post, id, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "EDIT_POST_PENDING" });
    axios
      .put(`https://infblogdemo.herokuapp.com/posts/${id}`, post, authtoken)

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
        dispatch({
          type: "EDIT_POST_FAILURE",
          message: error.message,
        });
        for (const a in error.response.data.data.errors) {
          error.response.data.data.errors[a].map((error) =>
            toast.error(error, {
              position: toast.POSITION.TOP_CENTER,
            })
          );
        }
      });
  };
};

export const getSinglePost = (id) => {
  return (dispatch) => {
    dispatch({ type: "SINGLE_POST_PENDING" });

    axios
      .get(`https://infblogdemo.herokuapp.com/posts/${id}`)

      .then((res) => {
        dispatch({ type: "SINGLE_POST_SUCCESS", post: res.data });
      })
      .catch((error) => {
        dispatch({
          type: "SINGLE_POST_FAILURE",
          message: error.message,
        });

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
