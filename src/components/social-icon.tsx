import Image from "next/image";

export function SocialIcon({ src, label }: { src: string; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center transition-transform hover:scale-105"
    >
      <Image src={src} alt="" width={36} height={36} unoptimized />
    </a>
  );
}
