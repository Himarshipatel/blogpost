const initialState = {
  loading: false,
  allcategory: null,
  addcategory: null,
  editcategory: null,
  singlecategory: null,
  error: false,
  message: null,
};

const CategoriesReducers = (state = initialState, action) => {
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
    case "ALL_CATEGORY_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
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
    case "ADD_CATEGORY_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "DELETE_CATEGORY_PENDING":
      return { ...state, loading: true };

    case "DELETE_CATEGORY_SUCCESS":
      return { ...state, loading: false };
    case "DELETE_CATEGORY_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "EDIT_CATEGORY_PENDING":
      return { ...state, loading: true, edittag: null };

    case "EDIT_CATEGORY_SUCCESS":
      return { ...state, loading: false, editcategory: action.editcategory };

    case "EDIT_CATEGORY_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "SINGLE_CATEGORY_PENDING":
      return { ...state, loading: true, singlecategory: null };

    case "SINGLE_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        singlecategory: action.singlecategory,
      };
    case "SINGLE_CATEGORY_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    default:
      return { ...state };
  }
};
export default CategoriesReducers;
