const initialState = {
  login: null,
};

const Loginreducer = (state = initialState, action) => {
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
    default:
      return { ...state };
  }
};
export default Loginreducer;
