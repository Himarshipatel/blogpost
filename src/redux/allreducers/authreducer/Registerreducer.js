const initialState = {
  register: null,
};

const Registerreducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return { ...state };
  }
};
export default Registerreducer;
