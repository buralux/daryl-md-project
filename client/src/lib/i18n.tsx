import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import en from "@/lib/translations/en";
import fr from "@/lib/translations/fr";

type Language = "en" | "fr";

const translations: Record<Language, Record<string, string>> = { en, fr };

interface TranslationContextType {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<TranslationContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language") as Language | null;
      if (stored === "en" || stored === "fr") return stored;
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "fr" : "en")}
      data-testid="button-language-switch"
      className="font-medium tracking-wide text-xs uppercase"
    >
      {language === "en" ? "FR" : "EN"}
    </Button>
  );
}
