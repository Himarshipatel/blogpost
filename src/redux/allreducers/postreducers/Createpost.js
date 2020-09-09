const initialState = {
  addpost: null,
  loading: false,
};

const Createpost = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POST_PENDING":
      return {
        ...state,
        addpost: null,
        loading: true,
      };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        addpost: action.addpost,
      };
    default:
      return { ...state };
  }
};
export default Createpost;
