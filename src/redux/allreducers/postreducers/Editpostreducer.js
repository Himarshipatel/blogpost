const initialState = {
  loading: false,
  editpost: null,
  error: false,
  message: null,
};

const edittagreducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_POST_PENDING":
      return { ...state, loading: true, editpost: null };

    case "EDIT_POST_SUCCESS":
      return { ...state, loading: false, editpost: action.editpost };

    case "EDIT_POST_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export default edittagreducer;
