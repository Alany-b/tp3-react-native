export const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm shadow-slate-200/50">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <span className="text-xl font-semibold">· · ·</span>
        </div>
        <p className="text-lg font-semibold text-slate-800">Cargando...</p>
        <p className="mt-2 text-sm text-slate-500">Un momento por favor.</p>
      </div>
    </div>
  );
};
