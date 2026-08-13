export function CaseStudyCard({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
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
        {/* You can add a decorative design element or screenshot here if needed, matching the empty layout by default */}
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
