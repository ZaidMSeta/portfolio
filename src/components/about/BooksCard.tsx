import { useMemo } from "react";
import { BookOpen } from "lucide-react";
import {
  getHardcoverData,
  getPrimaryAuthor,
  type HardcoverBook,
} from "../../lib/utils/hardcover";

function BookCover({ book }: { book: HardcoverBook | null }) {
  const imageUrl = book?.book?.image?.url;

  if (!book) {
    return (
      <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[10px] text-white/35">
        No book
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[10px] text-white/35">
        No cover
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={book.book.title}
      className="h-20 w-14 shrink-0 rounded-md border border-white/10 object-cover"
      loading="lazy"
    />
  );
}

export function BooksCard() {
  const data = useMemo(() => getHardcoverData(), []);

  return (
    <article className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-teal-300" />
          <h3 className="text-sm font-medium text-white">Reading</h3>
        </div>
        <span className="text-xs text-white/50">Hardcover</span>
      </div>

      <div className="mb-5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 text-xs text-white/45">Currently Reading</p>

        {data.currentRead ? (
          <div className="flex items-start gap-4">
            <BookCover book={data.currentRead} />
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-medium text-white">
                {data.currentRead.book.title}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {getPrimaryAuthor(data.currentRead)}
              </p>
              <p className="mt-2 text-xs text-white/45">
                Started {data.currentRead.user_book_reads?.[0]?.started_at || "recently"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/60">Nothing marked as currently reading.</p>
        )}
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 text-xs text-white/45">Last Finished</p>

        {data.lastFinished ? (
          <div className="flex items-start gap-4">
            <BookCover book={data.lastFinished} />
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-medium text-white">
                {data.lastFinished.book.title}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {getPrimaryAuthor(data.lastFinished)}
              </p>
              <p className="mt-2 text-xs text-white/45">Finished recently</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/60">No finished books yet.</p>
        )}
      </div>
    </article>
  );
}