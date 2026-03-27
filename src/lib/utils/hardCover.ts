import hardcoverData from "../../data/hardcover.json";

export type HardcoverBook = {
  id: number;
  updated_at: string;
  book: {
    title: string;
    image?: {
      url?: string | null;
    } | null;
    contributions?: Array<{
      author?: {
        name?: string | null;
      } | null;
    }>;
  };
  user_book_reads?: Array<{
    started_at?: string | null;
  }>;
};

export type HardcoverData = {
  username: string | null;
  currentRead: HardcoverBook | null;
  lastFinished: HardcoverBook | null;
  fetchedAt: string;
};

export function getHardcoverData(): HardcoverData {
  return hardcoverData as HardcoverData;
}

export function getPrimaryAuthor(book: HardcoverBook | null): string {
  return book?.book?.contributions?.[0]?.author?.name || "Unknown author";
}