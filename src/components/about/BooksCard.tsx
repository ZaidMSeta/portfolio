import { BookOpen } from "lucide-react";

const books = [
  {
    title: "TBA",
    author: "TBA",
    cover: "TBA",
  },
  {
    title: "TBA",
    author: "TBA",
    cover: "TBA",
  },
  {
    title: "TBA",
    author: "TBA",
    cover: "TBA",
  },
];

export function BooksCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-5 flex items-center gap-2">
        <BookOpen size={14} className="text-teal-300" />
        <h3 className="text-sm font-medium text-white">Recently Read</h3>
      </div>

      <div className="space-y-3">
        {books.map((book) => (
          <div
            key={book.title}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <div className="h-14 w-10 shrink-0 overflow-hidden rounded-md bg-white/5">
              <img
                src={book.cover}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {book.title}
              </p>
              <p className="text-xs text-white/50">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}