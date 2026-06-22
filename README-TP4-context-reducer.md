# TP N°3 — Estado Global con Context API y useReducer

## Descripción

Se implementó un estado global en la aplicación de notas utilizando Context API y `useReducer`. El objetivo fue centralizar el manejo del estado (notas y usuario) para que cualquier componente pueda acceder a él sin necesidad de pasar props entre componentes.

---

## Implementación

### Reducer — `src/hooks/useReducer.js`

Define el estado inicial y las acciones que pueden modificarlo.

```js
export const initialState = {
  notes: [],
  user: { id: null, username: null },
  status: "idle",
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };
    case "DELETE_NOTE":
      return { ...state, notes: state.notes.filter((n) => n._id !== action.payload) };
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
```

**Acciones implementadas:**

| Acción | Qué hace |
|---|---|
| `SET_USER` | Guarda el usuario autenticado |
| `SET_NOTES` | Carga la lista inicial de notas |
| `ADD_NOTE` | Agrega una nota nueva |
| `DELETE_NOTE` | Elimina una nota por ID |
| `SUBMIT` / `SUCCESS` / `ERROR` | Maneja el estado del formulario |
| `RESET` | Vuelve al estado inicial |

---

### Context — `src/context/GlobalContext.jsx`

Crea el contexto, conecta el reducer y expone los datos a toda la aplicación.

```jsx
import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../hooks/useReducer";

export const NoteContext = createContext();

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
```

- `createContext` crea el contenedor global.
- `useReducer` conecta el reducer con el estado inicial.
- `Provider` distribuye `state` y `dispatch` a todos los componentes hijos.
- `useNotes` es un hook propio para consumir el contexto fácilmente.

---

### Uso en componentes

**Guardar el usuario al autenticar — `PrivateRoutes.jsx`:**
```jsx
const { dispatch } = useContext(NoteContext);
dispatch({ type: "SET_USER", payload: { id, username } });
```

**Leer el usuario — `HomePage.jsx`:**
```jsx
const { state } = useContext(NoteContext);
const { user } = state;
```

**Agregar y eliminar notas — `NotesPage.jsx`:**
```jsx
const { state, dispatch } = useNotes();

dispatch({ type: "ADD_NOTE", payload: nuevaNota });
dispatch({ type: "DELETE_NOTE", payload: id });
```

---

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/hooks/useReducer.js` | Se agregó `notes` y `user` al estado, nuevas acciones |
| `src/context/GlobalContext.jsx` | Reemplazó `useState` por `useReducer`, se exporta `useNotes` |
| `src/pages/NotesPage.jsx` | Consume `state.notes` y `dispatch` del contexto |
| `src/routes/PrivateRoutes.jsx` | Usa `dispatch` para guardar el usuario autenticado |

---

## Flujo de datos

```
NotesProvider (state + dispatch)
    │
    ├── PrivateRoutes → dispatch SET_USER al verificar login
    ├── HomePage      → lee state.user
    └── NotesPage     → lee state.notes, dispatch ADD_NOTE / DELETE_NOTE
```

Ningún componente recibe datos por props desde otro — todos leen y escriben directamente en el contexto.
