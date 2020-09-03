const initialState = {
  allpost: null,
  loading: false,
};

const Allpostreducer = (state = initialState, action) => {
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
    default:
      return { ...state };
  }
};
export default Allpostreducer;
