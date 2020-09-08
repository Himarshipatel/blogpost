const initialState = {
  allcategory: null,
  loading: false,
};

const Allcategoryreducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_CATEGORY_PENDING":
      return {
        ...state,
        allcategory: null,
        loading: true,
      };
    case "ALL_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        allcategory: action.allcategory,
      };
    default:
      return { ...state };
  }
};
export default Allcategoryreducer;
