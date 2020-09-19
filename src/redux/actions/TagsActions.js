import axios from "axios";
import { toast } from "react-toastify";

export const Alltag = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_TAG_PENDING" });

    axios
      .get("https://infblogdemo.herokuapp.com/tags")

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

// ------------deleteaction---------

export const Deletetag = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };

  return (dispatch) => {
    dispatch({ type: "DELETE_TAG_PENDING" });

    axios
      .delete(`https://infblogdemo.herokuapp.com/tags/${id}`, authtoken)

      .then((res) => {
        dispatch(Alltag());
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
// ----------------edit------------

export const Edittag = (tags, id, setModal) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "EDIT_TAG_PENDING" });
    axios
      .put(`https://infblogdemo.herokuapp.com/tags/${id}`, tags, authtoken)

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
        dispatch({
          type: "EDIT_TAG_FAILURE",
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
// --------------singletag------------

export const Singletag = (id) => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "SINGLE_TAG_PENDING" });

    axios
      .get(`https://infblogdemo.herokuapp.com/tags/${id}`, authtoken)

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

// ==================
export const Addtag = (tags, setModal) => {
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
        tags,

        authtoken
      )

      .then((res) => {
        dispatch(Alltag());
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

// export const getSingleTag  = (id) => {
//   const tokenn = localStorage.getItem("token");
//   const authtoken = {
//     headers: {
//       Authorization: `Bearer ${tokenn}`,
//     },
//   };
//   return (dispatch) => {
//     dispatch({ type: "SINGLE_CATEGORY_PENDING" });

//     axios
//       .get(`https://infblogdemo.herokuapp.com/categories/${id}`, authtoken)

//       .then((res) => {
//         dispatch({
//           type: "SINGLE_CATEGORY_SUCCESS",
//           tag: res.data,
//         });
//       })
//       .catch((error) => {
//         error.response.data.message.map((error) =>
//           error.messages.map((item) =>
//             toast.error(item.message, {
//               position: toast.POSITION.TOP_CENTER,
//             })
//           )
//         );
//       });
//   };
// };
