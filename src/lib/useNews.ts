import { useEffect, useState } from "react";
import { stream } from "./messages";

import type { NewsSettings } from '../NewsSettings';

export default function useNews(settings: NewsSettings) {
  const [news, setNews] = useState("");

  useEffect(() => {
    const noNews = '';
    const ctrl = new AbortController();
    const res = stream(settings, ctrl.signal);

    res.on("connect", () => setNews(noNews));

    res.on("text", (chunk) => {
      if (ctrl.signal.aborted)
        return;
      setNews((t) => t + chunk);
    });

    return () => ctrl.abort();
  }, [settings]);

  return news;
}
