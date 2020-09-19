const initialState = {
  login: null,
  message: null,
  error: false,
  signup: { loading: false, error: false, message: null },
};

const AuthReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN_PENDING":
      return {
        ...state,
        login: null,
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        login: action.login,
      };
    case "SIGN_IN_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    case "SIGN_UP_PENDING":
      return {
        ...state,
        signup: { loading: true },
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        signup: { loading: false },
      };
    case "SIGN_UP_FAILURE":
      return {
        ...state,
        signup: { loading: false, error: false, message: null },
      };
    default:
      return { ...state };
  }
};
export default AuthReducers;
