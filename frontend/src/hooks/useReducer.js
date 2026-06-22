export const initialState = {
  notes: [],
  user: { id: null, username: null }, // <- agregar
  status: "idle",
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_USER": // <- agregar
      return { ...state, user: action.payload };

    case "SET_NOTES":
      return { ...state, notes: action.payload };

    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };

    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((n) => n._id !== action.payload),
      };

    case "SUBMIT":
      return { ...state, status: "submitting", error: null };

    case "SUCCESS":
      return { ...state, status: "success", error: null };

    case "ERROR":
      return { ...state, status: "error", error: action.payload };

    case "RESET":
      return { ...initialState };

    default:
      return state;
  }
}
