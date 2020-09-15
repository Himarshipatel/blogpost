import axios from "axios";
import { toast } from "react-toastify";

export const Allcategory = () => {
  // const tokenn = localStorage.getItem("token");
  // const authtoken = {
  //   headers: {
  //     Authorization: `Bearer ${tokenn}`,
  //   },
  // };
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
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
