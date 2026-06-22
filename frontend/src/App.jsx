import { NotesProvider } from "./context/GlobalContext";
import { AppRouter } from "./routes/AppRouter";

export const App = () => {
  return (
    <>
      <NotesProvider>
        <AppRouter />
      </NotesProvider>
    </>
  );
};
