import { useEffect, useState } from "react";
import { NoteCard } from "../components/NoteCard";
import { Loading } from "../components/Loading";
import axios from "axios";
import { Button } from "../components/Button";
import { useForm } from "../hooks/useForm";
import { useNotes } from "../context/GlobalContext";

export const NotesPage = () => {
  const { state, dispatch } = useNotes();
  const { notes } = state;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const { handleChange, handleReset, form } = useForm({
    title: "",
    content: "",
  });
  const { title, content } = form;

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      dispatch({ type: "RESET" });
      try {
        const resp = await axios.get("http://localhost:3000/api/auth/notes", {
          withCredentials: true,
        });
        dispatch({ type: "SET_NOTES", payload: resp.data?.notes ?? [] });
      } catch (error) {
        dispatch({
          type: "ERROR",
          payload:
            error.response?.data?.msg || "No se pudieron cargar las notas.",
        });
      } finally {
        setLoading(false);
      }
    };
    getNotes();
  }, []);

  const postNote = async (e) => {
    e.preventDefault();
    setLoadingPost(true);
    dispatch({ type: "SUBMIT" });
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/auth/notes",
        form,
        {
          withCredentials: true,
        },
      );
      if (resp.status === 201 || resp.status === 200) {
        dispatch({ type: "ADD_NOTE", payload: resp.data?.note || form });
        dispatch({ type: "SUCCESS" });
        setSuccess("Nota publicada correctamente");
        setShowForm(false);
        handleReset();
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.msg || "No se pudo publicar la nota",
      });
    } finally {
      setLoadingPost(false);
    }
  };

  const deleteNote = async (id) => {
    setDeletingId(id);
    dispatch({ type: "RESET" });
    try {
      const resp = await axios.delete(
        `http://localhost:3000/api/auth/notes/${id}`,
        {
          withCredentials: true,
        },
      );
      if (resp.status === 200 || resp.status === 204) {
        dispatch({ type: "DELETE_NOTE", payload: id });
        setSuccess("Nota eliminada correctamente");
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response?.data?.msg || "No se pudo eliminar la nota",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/40">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
              Notas
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Bienvenido a la sección de notas
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Aquí puedes revisar tus notas y mantenerlas organizadas. Solo
              verás lo que esté asociado a tu sesión activa.
            </p>
          </div>

          {state.error && (
            <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {state.error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-3xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
              {success}
            </div>
          )}

          {!state.error && notes.length === 0 && !showForm && (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center text-slate-600">
              Aún no hay notas creadas.
            </div>
          )}

          <div className="mt-6">
            <Button
              onClick={() => setShowForm(!showForm)}
              className={showForm ? "bg-slate-500 hover:bg-slate-600" : ""}
            >
              {showForm ? "Cancelar" : "+ Nueva nota"}
            </Button>
          </div>
        </div>

        {showForm && (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/40">
            <h2 className="mb-6 text-xl font-semibold text-slate-900">
              Crear nueva nota
            </h2>
            <form onSubmit={postNote} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-slate-700"
                >
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="Ingresa el título de tu nota"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-slate-700"
                >
                  Contenido
                </label>
                <textarea
                  name="content"
                  id="content"
                  value={content}
                  onChange={handleChange}
                  placeholder="Escribe el contenido de tu nota"
                  required
                  rows="5"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loadingPost}>
                  {loadingPost ? "Publicando..." : "Publicar nota"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    handleReset();
                    dispatch({ type: "RESET" });
                  }}
                  className="bg-slate-400 hover:bg-slate-500"
                >
                  Descartar
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <div key={note._id} className="flex flex-col gap-3">
              <NoteCard
                title={note.title}
                author={note.author}
                content={note.content}
              />
              <button
                onClick={() => deleteNote(note._id)}
                disabled={deletingId === note._id}
                className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:bg-red-300"
              >
                {deletingId === note._id ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
