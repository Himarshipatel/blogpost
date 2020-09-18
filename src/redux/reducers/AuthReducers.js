const initialState = {
  login: null,
  register: null,
  message: null,
  error: false,
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
        register: null,
      };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        register: action.register,
      };
    case "SIGN_UP_FAILURE":
      return { ...state, loading: false, error: true, message: action.message };
    default:
      return { ...state };
  }
};
export default AuthReducers;
