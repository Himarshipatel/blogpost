const initialState = {
  createCategory: { loading: false, error: false, message: null },
  allCategories: {
    loading: false,
    allCategories: null,
    error: false,
    message: null,
  },
  singleCategory: {
    loading: false,
    category: null,
    error: false,
    message: null,
  },
  deleteCategory: { loading: false, error: false, message: null },
  editCategory: { loading: false, error: false, message: null },
};

const CategoriesReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_CATEGORY_PENDING":
      return {
        ...state,
        allCategories: {
          loading: true,
          allCategories: null,
          error: false,
          message: null,
        },
      };
    case "ALL_CATEGORY_SUCCESS":
      return {
        ...state,
        allCategories: {
          loading: false,
          allCategories: action.allCategories,
          error: false,
          message: null,
        },
      };
    case "ALL_CATEGORY_FAILURE":
      return {
        ...state,
        allCategories: {
          loading: false,
          allCategories: null,
          error: true,
          message: action.message,
        },
      };
    case "ADD_CATEGORY_PENDING":
      return {
        ...state,
        createCategory: { loading: false, error: false, message: null },
      };
    case "ADD_CATEGORY_SUCCESS":
      return {
        ...state,
        createCategory: { loading: false, error: false, message: null },
      };
    case "ADD_CATEGORY_FAILURE":
      return {
        ...state,
        createCategory: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "DELETE_CATEGORY_PENDING":
      return {
        ...state,
        deleteCategory: { loading: true, error: false, message: null },
      };

    case "DELETE_CATEGORY_SUCCESS":
      return {
        ...state,
        deleteCategory: { loading: false, error: false, message: null },
      };
    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        deleteCategory: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "EDIT_CATEGORY_PENDING":
      return {
        ...state,
        editCategory: { loading: true, error: false, message: null },
      };
    case "EDIT_CATEGORY_SUCCESS":
      return {
        ...state,
        editCategory: { loading: false, error: false, message: null },
      };
    case "EDIT_CATEGORY_FAILURE":
      return {
        ...state,
        editCategory: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "SINGLE_CATEGORY_PENDING":
      return {
        ...state,
        singleCategory: {
          loading: true,
          category: null,
          error: false,
          message: null,
        },
      };
    case "SINGLE_CATEGORY_SUCCESS":
      return {
        ...state,
        singleCategory: {
          loading: false,
          category: action.category,
          error: false,
          message: null,
        },
      };
    case "SINGLE_CATEGORY_FAILURE":
      return {
        ...state,
        singleCategory: {
          loading: false,
          category: null,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};
export default CategoriesReducers;
