import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { heroTexture } from "@/lib/constants";

export function ProjectCard({
  number,
  title,
  description,
  tag,
  onClick,
}: {
  number: string;
  title: string;
  description: string;
  tag: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mx-auto grid w-full max-w-200.25 gap-5 overflow-hidden rounded-3xl bg-[#f2f2f2] p-6 text-left shadow-[0_8px_28px_rgba(0,0,0,0.05)] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0392ea]/30 md:grid-cols-[1fr_1.35fr] md:items-start"
    >
      {/* Background Hover Blue Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#b6daf7_0%,rgba(219,235,249,0.5)_35%,transparent_65%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-4">
        <div>
          <p className="text-sm text-foreground/60">{number}</p>
          <h3 className="mt-3 font-serif text-[48px] leading-none text-foreground">
            {title}
          </h3>
          <p className="mt-4 max-w-67.5 text-sm leading-5 text-foreground/75">
            {description}
          </p>
        </div>

        <Badge variant={'secondary'}>
          {tag}
        </Badge>
      </div>

      <div className="relative z-10 min-h-67.5 overflow-hidden rounded-[20px] bg-[#dde3e8]">
        <Image
          src={heroTexture}
          alt={`${title} preview`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 457px"
          unoptimized
        />
      </div>
    </button>
  );
}
