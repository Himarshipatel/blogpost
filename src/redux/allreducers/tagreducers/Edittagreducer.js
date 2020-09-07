const initialState = {
  loading: false,
  edittag: null,
  error: false,
  message: null,
};

const edittagreducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_TAG_PENDING":
      return { ...state, loading: true, edittag: null };

    case "EDIT_TAG_SUCCESS":
      return { ...state, loading: false, edittag: action.edittag };

    case "EDIT_TAG_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export default edittagreducer;
