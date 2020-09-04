const initialState = {
  loading: false,
};

const Deletetagreducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_TAG_PENDING":
      return { ...state, loading: true };

    case "DELETE_TAG_SUCCESS":
      return { ...state, loading: false };

    case "DELETE_TAG_FAILURE":
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
export default Deletetagreducer;
