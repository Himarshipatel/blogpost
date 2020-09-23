import axios from "axios";
import { toast } from "react-toastify";
import { config, errorHandel } from "../../common";

export const allPost = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_POST_PENDING" });

    axios
      .get(`${config.apiUrl}/posts`)

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
export const addPost = (post, setModal) => {
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
        `${config.apiUrl}/posts`,

        post,

        authtoken
      )

      .then((res) => {
        dispatch(allPost());
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
        errorHandel(error);
      });
  };
};

export const deletePost = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "DELETE_POST_PENDING" });

    axios
      .delete(`${config.apiUrl}/posts/${id}`, authtoken)

      .then((res) => {
        dispatch(allPost());
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
export const editPost = (post, id, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "EDIT_POST_PENDING" });
    axios
      .put(`${config.apiUrl}/posts/${id}`, post, authtoken)

      .then((res) => {
        dispatch({
          type: "EDIT_POST_SUCCESS",
          editpost: res.data,
        });
        setModal(false);
        dispatch(allPost());
        toast.success("successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_POST_FAILURE",
          message: error.message,
        });
        errorHandel(error);
      });
  };
};

export const getSinglePost = (id) => {
  return (dispatch) => {
    dispatch({ type: "SINGLE_POST_PENDING" });

    axios
      .get(`${config.apiUrl}/posts/${id}`)

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
