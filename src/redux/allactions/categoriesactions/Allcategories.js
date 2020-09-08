import axios from "axios";
import { toast } from "react-toastify";

export const Allcategory = () => {
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  return (dispatch) => {
    dispatch({ type: "ALL_CATEGORY_PENDING" });

    axios
      .get("https://infblogdemo.herokuapp.com/categories", authtoken)

      .then((res) => {
        console.log(res);
        dispatch({
          type: "ALL_CATEGORY_SUCCESS",
          allcategory: res.data,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error", {
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
