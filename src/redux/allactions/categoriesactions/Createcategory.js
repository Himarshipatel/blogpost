import axios from "axios";
import { toast } from "react-toastify";
import { Allcategory } from "./Allcategories.js";
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
