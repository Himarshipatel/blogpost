const initialState = {
  addcategory: null,
  loading: false,
};

const Createcategory = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY_PENDING":
      return {
        ...state,
        addtag: null,
        loading: true,
      };
    case "ADD_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        addcategory: action.addcategory,
      };
    default:
      return { ...state };
  }
};
export default Createcategory;
