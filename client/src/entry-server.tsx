import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

// Rendu d'une route donnee en HTML statique (sans navigateur).
// wouter <Router ssrPath> fournit l'URL courante cote Node.
export function render(path: string): string {
  return renderToString(
    <Router ssrPath={path}>
      <App />
    </Router>
  );
}
