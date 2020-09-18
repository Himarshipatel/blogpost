const initialState = {
  loading: false,
  alltag: null,
  addtag: null,
  edittag: null,
  singletag: null,
  error: false,
  message: null,
};

const TagsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_TAG_PENDING":
      return {
        ...state,
        alltag: null,
        loading: true,
      };
    case "ALL_TAG_SUCCESS":
      return {
        ...state,
        loading: false,
        alltag: action.alltag,
      };
    case "ALL_TAG_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "ADD_TAG_PENDING":
      return {
        ...state,
        addtag: null,
        loading: true,
      };

    case "ADD_TAG_SUCCESS":
      return {
        ...state,
        loading: false,
        addtag: action.addtag,
      };
    case "ADD_TAG_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "DELETE_TAG_PENDING":
      return { ...state, loading: true };

    case "DELETE_TAG_SUCCESS":
      return { ...state, loading: false };

    case "DELETE_TAG_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "EDIT_TAG_PENDING":
      return { ...state, loading: true, edittag: null };

    case "EDIT_TAG_SUCCESS":
      return { ...state, loading: false, edittag: action.edittag };

    case "EDIT_TAG_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "SINGLE_TAG_PENDING":
      return { ...state, loading: true, singletag: null };

    case "SINGLE_TAG_SUCCESS":
      return { ...state, loading: false, singletag: action.singletag };
    case "SINGLE_TAG_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    default:
      return { ...state };
  }
};
export default TagsReducers;
