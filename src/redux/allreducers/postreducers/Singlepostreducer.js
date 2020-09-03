const initialState = {
  singlepost: null,
  loading: false,
};

const Singlepostreducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return { ...state };
  }
};
export default Singlepostreducer;
