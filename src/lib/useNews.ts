import { useEffect, useRef, useState } from "react";
import { stream } from "./messages";

import type { NewsSettings } from '../NewsSettings';
import type { CitationsWebSearchResultLocation } from "@anthropic-ai/sdk/resources.js";

function getCitationMarkdownUrl(citation: CitationsWebSearchResultLocation) {
  return `[${citation.title}](${citation.url})`;
}

export default function useNews(settings: NewsSettings) {
  const [news, setNews] = useState("");
  const citationsRef = useRef<Record<string, CitationsWebSearchResultLocation>>({});

  useEffect(() => {
    const noNews = '';
    const ctrl = new AbortController();
    const res = stream(settings, ctrl.signal);

    function guard <T extends unknown[]>(fn: (...args: T) => void) {
      return (...args: T) => {
        if (ctrl.signal.aborted)
          return;
        fn(...args);
      };
    }

    res.on("connect", guard(() => {
      setNews(noNews);
      citationsRef.current = {};
    }));

    res.on("text", guard(chunk => {
      setNews((t) => t + chunk);
    }));

    res.on("citation", guard(citation => {
      if (citation.type === 'web_search_result_location') {
        citationsRef.current[citation.url] = citation;
      }
    }));

    res.on("finalMessage", guard(() => {      
      const sources = Object.values(citationsRef.current)
        .map(x => " * " + getCitationMarkdownUrl(x))
        .join("\n");

      setNews(news => news + `\n\n### Sources\n\n${sources}`);
    }));

    return () => ctrl.abort();
  }, [settings]);

  return news;
}
