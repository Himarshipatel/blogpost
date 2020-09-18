import axios from "axios";
import { toast } from "react-toastify";

export const Allcategory = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_CATEGORY_PENDING" });

    axios
      .get("https://infblogdemo.herokuapp.com/categories")

      .then((res) => {
        dispatch({
          type: "ALL_CATEGORY_SUCCESS",
          allcategory: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ALL_CATEGORY_FAILURE",
          message: error.message,
        });
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};

export const Addcategory = (category, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "ADD_CATEGORY_PENDING" });

    axios
      .post(
        "https://infblogdemo.herokuapp.com/categories",
        category,

        authtoken
      )

      .then((res) => {
        dispatch(Allcategory());
        dispatch({
          type: "ADD_CATEGORY_SUCCESS",
          addcategory: res.data,
        });
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
export const Deletecategory = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "DELETE_CATEGORY_PENDING" });

    axios
      .delete(`https://infblogdemo.herokuapp.com/categories/${id}`, authtoken)

      .then((res) => {
        dispatch(Allcategory());
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

export const Editcategory = (category, id, setModal) => {
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
        `https://infblogdemo.herokuapp.com/categories/${id}`,
        category,

        authtoken
      )

      .then((res) => {
        dispatch({
          type: "EDIT_CATEGORY_SUCCESS",
          editcategory: res.data,
        });
        setModal(false);
        dispatch(Allcategory());
        toast.success("successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        setModal(true);
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

export const Singlecategory = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "SINGLE_CATEGORY_PENDING" });

    axios
      .get(`https://infblogdemo.herokuapp.com/categories/${id}`, authtoken)

      .then((res) => {
        dispatch({
          type: "SINGLE_CATEGORY_SUCCESS",
          singlecategory: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SINGLE_CATEGORY_FAILURE",
          message: error.message,
        });
        error.response.data.message.map((error) =>
          error.messages.map((item) =>
            toast.error(item.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          )
        );
      });
  };
};
