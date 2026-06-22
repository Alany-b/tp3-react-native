import { useState } from "react";
import { Button } from "../components/Button";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const InitPage = () => {
  const [haveAccount, setHaveAccount] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { handleChange, handleReset, form } = useForm({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resp = await axios.post(
        "http://localhost:3000/api/auth/login",
        form,
        {
          withCredentials: true,
        },
      );

      if (resp.status === 200) {
        handleReset();
        setRedirect(true);
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resp = await axios.post(
        "http://localhost:3000/api/auth/register",
        form,
        {
          withCredentials: true,
        },
      );

      if (resp.status === 200) {
        handleReset();
        setHaveAccount(true);
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  if (redirect) return <Navigate to="/home" replace />;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 sm:p-10">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Acceso seguro
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {haveAccount ? "Inicia sesión" : "Crea tu cuenta"}
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-6 text-slate-600">
            {haveAccount
              ? "Ingresa tus credenciales para acceder a tus notas."
              : "Regístrate para comenzar a crear y gestionar tus notas en la aplicación."}
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form
          onSubmit={haveAccount ? handleLoginSubmit : handleRegisterSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? "Cargando..."
              : haveAccount
                ? "Iniciar sesión"
                : "Registrarse"}
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500">
            {haveAccount ? "¿Aún no tienes cuenta?" : "¿Ya tienes cuenta?"}
          </p>
          <button
            type="button"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            onClick={() => setHaveAccount(!haveAccount)}
          >
            {haveAccount ? "Regístrate aquí" : "Inicia sesión aquí"}
          </button>
        </div>
      </section>
    </main>
  );
};
