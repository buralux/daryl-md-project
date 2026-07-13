import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Miroir localisé de contactFormSchema (@shared/schema) : mêmes règles,
// messages traduits EN/FR côté client.
function buildContactSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().min(1, t("contact.validation.name")).max(100),
    email: z.string().email(t("contact.validation.email")),
    message: z.string().min(1, t("contact.validation.message")).max(2000),
  });
}

type ContactForm = z.infer<ReturnType<typeof buildContactSchema>>;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(buildContactSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Pas de backend d'envoi autorisé sur l'hébergement statique : le formulaire
  // compose un e-mail dans l'application de l'utilisateur (mailto:). Aucun faux
  // état "envoyé" — le message part quand l'utilisateur l'envoie lui-même.
  function onSubmit(data: ContactForm) {
    const to = t("contact.email.address");
    const subject = `[daryl.md] ${data.name}`;
    const body = `${data.message}\n\n— ${data.name} <${data.email}>`;
    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // mailto: dépasse ~2000 caractères de façon peu fiable selon les clients.
    if (href.length > 1900) {
      toast({ title: t("contact.form.error"), variant: "destructive" });
      return;
    }
    try {
      window.location.href = href;
      toast({ title: t("contact.form.success") });
    } catch {
      toast({ title: t("contact.form.error"), variant: "destructive" });
    }
  }

  return (
    <Layout>
      <PageHead title="Contact - DARYL" path="/contact" />

      <section
        data-testid="section-contact-hero"
        className="min-h-[40vh] flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground"
        >
          {t("contact.hero.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-4 text-xl text-muted-foreground"
        >
          {t("contact.hero.subtitle")}
        </motion.p>
      </section>

      <section
        data-testid="section-contact-form"
        className="max-w-xl mx-auto px-6 py-16"
      >
        <motion.div {...fadeInUp}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.form.name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contact.form.name")}
                        data-testid="input-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.form.email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("contact.form.email")}
                        data-testid="input-email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.form.message")}</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder={t("contact.form.message")}
                        data-testid="input-message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                data-testid="button-submit"
              >
                {t("contact.form.submit")}
              </Button>

              <p
                className="text-xs text-muted-foreground text-center"
                data-testid="text-contact-notice"
              >
                {t("contact.form.notice")}
              </p>
            </form>
          </Form>

          <div className="mt-16 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {t("contact.email.label")}
            </p>
            <a
              href={`mailto:${t("contact.email.address")}`}
              className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
              data-testid="text-contact-email"
            >
              <Mail className="h-4 w-4" />
              {t("contact.email.address")}
            </a>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
