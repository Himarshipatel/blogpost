const initialState = {
  loading: false,
  singletag: null,
  error: false,
  message: null,
};

const singletagreducer = (state = initialState, action) => {
  switch (action.type) {
    case "SINGLE_TAG_PENDING":
      return { ...state, loading: true, singletag: null };

    case "SINGLE_TAG_SUCCESS":
      return { ...state, loading: false, singletag: action.singletag };

    default:
      return { ...state };
  }
};

export default singletagreducer;
