const initialState = {
  loading: false,
};

const Deletecategory = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_CATEGORY_PENDING":
      return { ...state, loading: true };

    case "DELETE_CATEGORY_SUCCESS":
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
export default Deletecategory;
