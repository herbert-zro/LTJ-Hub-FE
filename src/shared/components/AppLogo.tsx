import { cn } from "@/lib/utils";

interface AppLogoProps {
  compact?: boolean;
  alt?: string;
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  compact = false,
  alt = "LTJ Logo",
  className,
}) => {
  return (
    <img
      src="/LTJ-Logo.png"
      alt={alt}
      className={cn(
        "h-8 w-auto object-contain transition-all",
        compact
          ? "max-w-12 opacity-95 scale-90 duration-200 ease-in"
          : "max-w-40 opacity-100 scale-100 duration-300 ease-out",
        className,
      )}
    />
  );
};
