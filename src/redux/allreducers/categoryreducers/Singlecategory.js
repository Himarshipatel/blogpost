const initialState = {
  loading: false,
  singlecategory: null,
  error: false,
  message: null,
};

const Singlecategory = (state = initialState, action) => {
  switch (action.type) {
    case "SINGLE_CATEGORY_PENDING":
      return { ...state, loading: true, singlecategory: null };

    case "SINGLE_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        singlecategory: action.singlecategory,
      };

    default:
      return { ...state };
  }
};

export default Singlecategory;
