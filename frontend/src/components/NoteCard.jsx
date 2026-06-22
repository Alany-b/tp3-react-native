export const NoteCard = ({ title, author, content }) => {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-500">
            {author ?? "Autor desconocido"}
          </p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-700">{content}</p>
    </article>
  );
};
