import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span
      data-testid="logo"
      className={cn("text-xl font-bold tracking-tight", className)}
    >
      DARYL
    </span>
  );
}
