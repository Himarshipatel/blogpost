import axios from "axios";
import { toast } from "react-toastify";
import { Allcategory } from "./Allcategories.js";

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
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
