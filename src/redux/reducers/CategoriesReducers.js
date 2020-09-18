const initialState = {
  createCategory: { loading: false, error: false, message: null },
  allCategories: {
    loading: false,
    categoriesData: null,
    error: false,
    message: null,
  },
  getSingleCategory: {
    loading: false,
    category: null,
    error: false,
    message: null,
  },
  deleteCategory: { loading: false, error: false, message: null },
  updateCategory: { loading: false, error: false, message: null },
};

const CategoriesReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_CATEGORY_PENDING":
      return {
        ...state,
        allCategories: {
          loading: true,
          allcategory: null,
          error: false,
          message: null,
        },
      };
    case "ALL_CATEGORY_SUCCESS":
      return {
        ...state,
        allCategories: {
          loading: false,
          categoriesData: action.categoriesData,
          error: false,
          message: null,
        },
      };
    case "ALL_CATEGORY_FAILURE":
      return {
        ...state,
        allCategories: {
          loading: false,
          categoriesData: null,
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
        updateCategory: { loading: true, error: false, message: null },
      };
    case "EDIT_CATEGORY_SUCCESS":
      return {
        ...state,
        updateCategory: { loading: false, error: false, message: null },
      };
    case "EDIT_CATEGORY_FAILURE":
      return {
        ...state,
        updateCategory: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "SINGLE_CATEGORY_PENDING":
      return {
        ...state,
        getSingleCategory: {
          loading: true,
          category: null,
          error: false,
          message: null,
        },
      };
    case "SINGLE_CATEGORY_SUCCESS":
      return {
        ...state,
        getSingleCategory: {
          loading: false,
          category: action.category,
          error: false,
          message: null,
        },
      };
    case "SINGLE_CATEGORY_FAILURE":
      return {
        ...state,
        getSingleCategory: {
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
