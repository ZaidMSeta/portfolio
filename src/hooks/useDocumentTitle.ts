import { useEffect } from "react";

const BASE_TITLE = "Zaid Seta — Software Developer";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Zaid Seta` : BASE_TITLE;
  }, [title]);
}
