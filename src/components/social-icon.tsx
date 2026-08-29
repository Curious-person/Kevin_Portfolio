import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export function SocialIcon({ src, label }: { src: IconDefinition; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center transition-transform hover:scale-105"
    >
      <FontAwesomeIcon icon={src} className="h-6 w-6 text-white" />
    </a>
  );
}
