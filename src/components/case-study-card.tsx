import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function CaseStudyCard({
  title,
  description,
  status,
  imageUrl,
  onClick,
}: {
  title: string;
  description: string;
  status?: string | null;
  imageUrl?: string | null;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mx-auto flex w-full max-w-200.25 flex-col gap-6 overflow-hidden rounded-3xl bg-[#f2f2f2] p-6 text-left shadow-[0_8px_28px_rgba(0,0,0,0.05)] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0392ea]/30"
    >
      {/* Background Hover Blue Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#b6daf7_0%,rgba(219,235,249,0.5)_35%,transparent_65%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
      />

      {/* Top Preview Container */}
      <div className="relative z-10 w-full aspect-[16/10] min-h-67.5 overflow-hidden rounded-[20px] bg-white shadow-inner flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${title} thumbnail`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        ) : null}
        {status && status.toLowerCase() !== "finished" && status.toLowerCase() !== "completed" && (
          <div className="absolute right-4 top-4 z-20">
            <Badge 
              className="text-xs font-medium tracking-wide uppercase shadow-sm bg-[#fc6e17] text-black hover:bg-[#fc6e17]/90"
            >
              {status}
            </Badge>
          </div>
        )}
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 flex flex-col justify-between gap-2">
        <div>
          <h3 className="font-serif text-[48px] leading-none text-foreground">
            {title}
          </h3>
          <p className="mt-4 text-sm leading-5 text-foreground/75">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
