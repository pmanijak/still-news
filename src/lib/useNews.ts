import { useEffect, useState } from "react";
import { stream } from "./messages";

import type { SettingsValue } from '../Settings';

export default function (settings: SettingsValue) {
  const noNews = "";
  const [news, setNews] = useState(noNews);
  const { sentiment } = settings;

  useEffect(() => {
    setNews(noNews);
    const ctrl = new AbortController();
    const res = stream({ sentiment }, ctrl.signal);

    res.on("text", (chunk) => {
      if (ctrl.signal.aborted)
        return;
      setNews((t) => t + chunk);
    });

    return () => ctrl.abort();
  }, [sentiment]);

  return news;
}
