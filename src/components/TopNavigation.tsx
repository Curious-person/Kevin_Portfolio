import { Button } from "@/components/ui/button";


export function Navsection({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-70">{title}</h1>
      <p className="text-lg font-light tracking-tight text-foreground transition-opacity hover:opacity-70">{description}</p>
    </div>

  )
}

export default function TopNavigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30">
      <div className="mx-auto flex h-20 items-center justify-between px-12">
        {/* Designation */}
        <div className="flex gap-4">
          <Navsection title="Philippine Based" description="Ready to work Globally" />
          <Navsection title="Philippine Based" description="Ready to work Globally" />
        </div>

        {/* CTA */}
        <Button variant="default" nativeButton={false} render={<a href="#contact" />}>
          Let's Talk
        </Button>
      </div>
    </header>
  );
}
