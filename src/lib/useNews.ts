import { useEffect, useState } from "react";
import { stream } from "./messages";

export default function () {
  const [news, setNews] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    const res = stream();

    res.on("text", (chunk) => {
      if (ctrl.signal.aborted)
        return;
      setNews((t) => t + chunk);
    });

    return () => {
      ctrl.abort();
      res.abort();
    };
  }, []);

  return news;
}
