const initialState = {
  loading: false,
  allpost: null,
  addpost: null,
  editpost: null,
  singlepost: null,
  error: false,
  message: null,
};

const PostsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_POST_PENDING":
      return {
        ...state,
        allpost: null,
        loading: true,
      };
    case "ALL_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        allpost: action.allpost,
      };
    case "ALL_POST_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "ADD_POST_PENDING":
      return {
        ...state,
        addpost: null,
        loading: true,
      };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        addpost: action.addpost,
      };
    case "ADD_POST_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "DELETE_POST_PENDING":
      return { ...state, loading: true };

    case "DELETE_POST_SUCCESS":
      return { ...state, loading: false };

    case "DELETE_POST_FAILURE":
      return { ...state, loading: false };
    case "EDIT_POST_PENDING":
      return { ...state, loading: true, editpost: null };

    case "EDIT_POST_SUCCESS":
      return { ...state, loading: false, editpost: action.editpost };

    case "EDIT_POST_FAILURE":
      return { ...state, loading: false, error: true };
    case "SINGLE_POST_PENDING":
      return {
        ...state,
        singlepost: null,
        loading: true,
      };
    case "SINGLE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        singlepost: action.singlepost,
      };
    case "SINGLE_POST_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    default:
      return { ...state };
  }
};
export default PostsReducers;
