import traktData from "../../data/trakt.json";

export type TraktItem = {
  title: string;
  year: number;
  type: "movie" | "show";
  posterUrl: string | null;
  watchedAt: string;
};

export type TraktData = {
  items: TraktItem[];
  fetchedAt: string | null;
};

export function getTraktData(): TraktData {
  return traktData as TraktData;
}
