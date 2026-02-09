import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { contactFormSchema } from "@shared/schema";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type ContactForm = z.infer<typeof contactFormSchema>;

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
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: t("contact.form.success"),
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: t("contact.form.error"),
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactForm) {
    mutation.mutate(data);
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
                disabled={mutation.isPending}
                data-testid="button-submit"
              >
                {mutation.isPending ? "..." : t("contact.form.submit")}
              </Button>
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
