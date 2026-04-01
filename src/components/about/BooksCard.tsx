import { useMemo } from "react";
import { BookOpen } from "lucide-react";
import {
  getHardcoverData,
  getPrimaryAuthor,
  type HardcoverBook,
} from "../../lib/utils/hardCover";

function BookCover({ book }: { book: HardcoverBook | null }) {
  const imageUrl = book?.book?.image?.url;

  if (!book) {
    return (
      <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-md border border-fg/10 bg-fg/[0.03] text-[10px] text-fg/35">
        No book
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-md border border-fg/10 bg-fg/[0.03] text-[10px] text-fg/35">
        No cover
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={book.book.title}
      className="h-20 w-14 shrink-0 rounded-md border border-fg/10 object-cover"
      loading="lazy"
    />
  );
}

export function BooksCard() {
  const data = useMemo(() => getHardcoverData(), []);

  return (
    <article className="min-w-0 rounded-xl border border-fg/10 bg-fg/5 p-5 transition hover:border-fg/20">
      <div className="mb-5 flex items-center gap-2">
        <BookOpen size={14} className="text-accent" />
        <h3 className="text-sm font-medium text-fg">Recently Read</h3>
      </div>

      <div className="mb-5 rounded-lg border border-fg/10 bg-fg/[0.03] p-4">
        <p className="mb-3 text-xs text-fg/45">Currently Reading</p>

        {data.currentRead ? (
          <div className="flex items-start gap-4">
            <BookCover book={data.currentRead} />
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-medium text-fg">
                {data.currentRead.book.title}
              </p>
              <p className="mt-1 text-sm text-fg/60">
                {getPrimaryAuthor(data.currentRead)}
              </p>
              <p className="mt-2 text-xs text-fg/45">
                Started {data.currentRead.user_book_reads?.[0]?.started_at || "recently"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-fg/60">Nothing marked as currently reading.</p>
        )}
      </div>

      <div className="rounded-lg border border-fg/10 bg-fg/[0.03] p-4">
        <p className="mb-3 text-xs text-fg/45">Last Finished</p>

        {data.lastFinished ? (
          <div className="flex items-start gap-4">
            <BookCover book={data.lastFinished} />
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-medium text-fg">
                {data.lastFinished.book.title}
              </p>
              <p className="mt-1 text-sm text-fg/60">
                {getPrimaryAuthor(data.lastFinished)}
              </p>
              <p className="mt-2 text-xs text-fg/45">Finished recently</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-fg/60">No finished books yet.</p>
        )}
      </div>
    </article>
  );
}
