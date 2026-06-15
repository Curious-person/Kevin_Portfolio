import { Button } from "@/components/ui/button";


export default function TopNavigation() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#6cd1da]">
      <div className="mx-auto flex h-20 items-center justify-end px-12">

        {/* CTA */}
        <Button variant="default" nativeButton={false} render={<a href="#contact" />}>
          Let's Talk
        </Button>
      </div>
    </header>
  );
}
