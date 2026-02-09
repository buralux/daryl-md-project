import { useEffect } from "react";

interface PageHeadProps {
  title: string;
  description?: string;
  path?: string;
}

function setMetaTag(property: string, content: string, isOg = false) {
  const attr = isOg ? "property" : "name";
  let meta = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function PageHead({ title, description, path }: PageHeadProps) {
  useEffect(() => {
    document.title = title;
    setMetaTag("og:title", title, true);
    setMetaTag("og:type", "website", true);
    if (path) {
      setMetaTag("og:url", `${window.location.origin}${path}`, true);
    }
  }, [title, path]);

  useEffect(() => {
    if (!description) return;
    setMetaTag("description", description);
    setMetaTag("og:description", description, true);
  }, [description]);

  return null;
}
