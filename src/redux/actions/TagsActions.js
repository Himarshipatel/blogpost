import axios from "axios";
import { toast } from "react-toastify";
import { config, errorHandel } from "../../common";

export const allTag = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_TAG_PENDING" });

    axios
      .get(`${config.apiUrl}/tags`)

      .then((res) => {
        dispatch({
          type: "ALL_TAG_SUCCESS",
          tagsData: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ALL_TAG_FAILURE",
          message: error.message,
        });
      });
  };
};

export const deleteTag = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "DELETE_TAG_PENDING" });

    axios
      .delete(`${config.apiUrl}/tags/${id}`, authtoken)

      .then((res) => {
        dispatch(allTag());
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

export const editTag = (tags, id, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "EDIT_TAG_PENDING" });
    axios
      .put(`${config.apiUrl}/tags/${id}`, tags, authtoken)

      .then((res) => {
        dispatch({
          type: "EDIT_TAG_SUCCESS",
          edittag: res.data,
        });
        setModal(false);
        dispatch(allTag());
        toast.success("successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_TAG_FAILURE",
          message: error.message,
        });
        errorHandel(error);
      });
  };
};

export const singleTag = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "SINGLE_TAG_PENDING" });

    axios
      .get(`${config.apiUrl}/tags/${id}`, authtoken)

      .then((res) => {
        dispatch({
          type: "SINGLE_TAG_SUCCESS",
          tag: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SINGLE_TAG_FAILURE",
          message: error.message,
        });
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

export const addTag = (tags, setModal) => {
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
        `${config.apiUrl}/tags`,
        tags,

        authtoken
      )

      .then((res) => {
        dispatch(allTag());
        dispatch({
          type: "ADD_TAG_SUCCESS",
          addtag: res.data,
        });
        toast.success("Create Tag Success", {
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
          type: "ADD_TAG_FAILURE",
          message: error.message,
        });
        errorHandel(error);
      });
  };
};
