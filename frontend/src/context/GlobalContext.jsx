import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../hooks/useReducer";

export const NoteContext = createContext(); // <- agregar export acá

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
