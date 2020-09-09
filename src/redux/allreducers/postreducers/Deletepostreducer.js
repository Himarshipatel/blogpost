const initialState = {
  loading: false,
};

const Deletepostreducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_POST_PENDING":
      return { ...state, loading: true };

    case "DELETE_POST_SUCCESS":
      return { ...state, loading: false };

    case "DELETE_POST_FAILURE":
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
export default Deletepostreducer;
