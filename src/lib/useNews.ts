import { useEffect, useState } from "react";
import { stream } from "./messages";

import type { NewsSettings } from '../NewsSettings';

export default function (settings: NewsSettings) {
  const noNews = "";
  const [news, setNews] = useState(noNews);

  useEffect(() => {
    setNews(noNews);
    const ctrl = new AbortController();
    const res = stream(settings, ctrl.signal);

    res.on("text", (chunk) => {
      if (ctrl.signal.aborted)
        return;
      setNews((t) => t + chunk);
    });

    return () => ctrl.abort();
  }, [settings]);

  return news;
}
