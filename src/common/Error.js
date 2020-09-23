import { toast } from "react-toastify";
const errorHandel = (error) => {
  for (const a in error.response.data.data.errors) {
    error.response.data.data.errors[a].map((error) =>
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      })
    );
  }
};
export default errorHandel;
