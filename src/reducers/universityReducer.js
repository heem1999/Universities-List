export const universityReducer = (state, action) => {
  switch (action.type) {
    case "ADD_University":
      return [...action.payload];
    case "REMOVE_University":
      return state.filter((university) => university.id !== action.id);
    case "SORT_ASC":
      return state.sort((a, b) => (a.name > b.name ? 1 : -1));
    case "SORT_DESC":
      return state.sort((a, b) => (a.name > b.name ? -1 : 1));

    default:
      return state;
  }
};
