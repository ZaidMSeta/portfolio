import { useEffect } from "react";

const AWAY_TITLE = "come back :(";

// Swaps the tab title while the visitor is on another tab, and puts it back when they return
export function useAwayTitle() {
  useEffect(() => {
    let saved = document.title;

    const onVisibilityChange = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = AWAY_TITLE;
      } else if (document.title === AWAY_TITLE) {
        document.title = saved;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);
}
