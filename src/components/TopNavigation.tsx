import { Button } from "@/components/ui/button";

export default function TopNavigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo / Brand */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          Kevin<span className="font-normal text-muted-foreground">.dev</span>
        </a>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
          <a href="#work" className="transition-colors hover:text-foreground">
            Work
          </a>
          <a href="#contact" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </nav>

        {/* CTA */}
        <Button variant="default" size="sm" nativeButton={false} render={<a href="#contact" />}>
          Let's Talk
        </Button>
      </div>
    </header>
  );
}
