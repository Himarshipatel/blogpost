import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

export const allCategory = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_CATEGORY_PENDING" });

    axios
      .get(`${config.apiUrl}/categories`)

      .then((res) => {
        dispatch({
          type: "ALL_CATEGORY_SUCCESS",
          allCategories: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ALL_CATEGORY_FAILURE",
          message: error.message,
        });
      });
  };
};

export const addCategory = (data, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "ADD_CATEGORY_PENDING" });

    axios
      .post(`${config.apiUrl}/categories`, data, authtoken)

      .then((res) => {
        dispatch({
          type: "ADD_CATEGORY_SUCCESS",
          addcategory: res.data,
        });
        dispatch(allCategory());
        toast.success("Create Category Success", {
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
          type: "ADD_CATEGORY_FAILURE",
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
export const deleteCategory = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "DELETE_CATEGORY_PENDING" });

    axios
      .delete(`${config.apiUrl}/categories/${id}`, authtoken)

      .then((res) => {
        dispatch(allCategory());
        dispatch({ type: "DELETE_CATEGORY_SUCCESS" });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_CATEGORY_FAILURE",
          message: error.message,
        });
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};

export const editCategory = (data, id, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "EDIT_CATEGORY_PENDING" });
    axios
      .put(
        `${config.apiUrl}/categories/${id}`,
        data,

        authtoken
      )

      .then((res) => {
        dispatch({
          type: "EDIT_CATEGORY_SUCCESS",
        });
        setModal(false);
        dispatch(allCategory());
        toast.success("successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_CATEGORY_FAILURE",
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

export const singleCategory = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "SINGLE_CATEGORY_PENDING" });

    axios
      .get(`${config.apiUrl}/categories/${id}`, authtoken)

      .then((res) => {
        dispatch({
          type: "SINGLE_CATEGORY_SUCCESS",
          category: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SINGLE_CATEGORY_FAILURE",
          message: error.message,
        });
      });
  };
};
