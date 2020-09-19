const initialState = {
  createPost: { loading: false, error: false, message: null },
  allPosts: { loading: false, posts: null, error: false, message: null },
  getSinglePost: { loading: false, post: null, error: false, message: null },
  deletePost: { loading: false, error: false, message: null },
  updatePost: { loading: false, error: false, message: null },
};

const PostsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_POST_PENDING":
      return {
        ...state,
        allPosts: { loading: true, posts: null, error: false, message: null },
      };
    case "ALL_POST_SUCCESS":
      return {
        ...state,
        allPosts: {
          loading: false,
          posts: action.posts,
          error: false,
          message: null,
        },
      };
    case "ALL_POST_FAILURE":
      return {
        ...state,
        allPosts: {
          loading: false,
          posts: null,
          error: true,
          message: action.message,
        },
      };
    case "ADD_POST_PENDING":
      return {
        ...state,
        createPost: { loading: true, error: false, message: null },
      };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        createPost: { loading: false, error: false, message: null },
      };
    case "ADD_POST_FAILURE":
      return {
        ...state,
        createPost: { loading: false, error: true, message: action.message },
      };
    case "DELETE_POST_PENDING":
      return {
        ...state,
        deletePost: { loading: true, error: false, message: null },
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        deletePost: { loading: false, error: false, message: null },
      };
    case "DELETE_POST_FAILURE":
      return {
        ...state,
        deletePost: { loading: false, error: true, message: action.message },
      };
    case "EDIT_POST_PENDING":
      return {
        ...state,
        updatePost: { loading: true, error: false, message: null },
      };
    case "EDIT_POST_SUCCESS":
      return {
        ...state,
        updatePost: { loading: false, error: false, message: null },
      };
    case "EDIT_POST_FAILURE":
      return {
        ...state,
        updatePost: { loading: false, error: true, message: action.message },
      };
    case "SINGLE_POST_PENDING":
      return {
        ...state,
        getSinglePost: {
          loading: true,
          post: null,
          error: false,
          message: null,
        },
      };
    case "SINGLE_POST_SUCCESS":
      return {
        ...state,
        getSinglePost: {
          loading: false,
          post: action.post,
          error: false,
          message: null,
        },
      };
    case "SINGLE_POST_FAILURE":
      return {
        ...state,
        getSinglePost: {
          loading: false,
          post: null,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};
export default PostsReducers;
