import { Link } from "react-router-dom";
import { useContext } from "react";
import { NoteContext } from "../context/GlobalContext";
import { Button } from "../components/Button";

export const HomePage = () => {
  const { state } = useContext(NoteContext);
  const { user } = state;
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/40">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
              Panel de {user.username}
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
              ¿Qué te gustaría explorar?
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Accede a tus notas guardadas y administra tu contenido desde un
              panel limpio y sencillo.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/notes"
              className="rounded-3xl border border-slate-200 bg-blue-600 px-6 py-5 text-center text-white transition hover:bg-blue-700"
            >
              Ver notas
            </Link>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5">
              <p className="text-base font-semibold text-slate-900">
                Autenticación segura
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                La aplicación usa cookies seguras para mantener tu sesión activa
                y proteger el acceso a tus notas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
