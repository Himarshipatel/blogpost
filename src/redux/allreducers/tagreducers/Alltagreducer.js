const initialState = {
  alltag: null,
  loading: false,
};

const Alltagreducer = (state = initialState, action) => {
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
    default:
      return { ...state };
  }
};
export default Alltagreducer;
