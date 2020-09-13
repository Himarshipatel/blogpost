import axios from "axios";
import { toast } from "react-toastify";
import { Allcategory } from "./Allcategories.js";
export const Addcategory = (title, slug, description, setModal) => {
  console.log(title, slug, description);
  const tokenn = localStorage.getItem("token");
  const authtoken = {
    headers: {
      Authorization: `Bearer ${tokenn}`,
    },
  };
  console.log(authtoken);
  return (dispatch) => {
    dispatch({ type: "ADD_CATEGORY_PENDING" });

    axios
      .post(
        "https://infblogdemo.herokuapp.com/categories",
        { title: title, slug: slug, description: description },
        authtoken
      )

      .then((res) => {
        console.log(res);
        dispatch(Allcategory());
        dispatch({
          type: "ADD_CATEGORY_SUCCESS",
          addcategory: res.data,
        });
        console.log(res.data);
        setModal(false);
      })
      .catch((error) => {
        setModal(true);
        console.log(error);
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
