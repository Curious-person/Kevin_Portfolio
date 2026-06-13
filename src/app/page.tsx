import TopNavigation from "@/components/TopNavigation";
import ScrollDownArrow from "@/components/ScrollDownArrow";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNavigation />

      <main className="flex flex-1 items-center justify-center px-6">
        <div className="text-center">
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Hello my name is Kevin
          </p>
          <h1 className="text-[clamp(3rem,14vw,10rem)] font-black uppercase leading-none tracking-tight">
            Design Engineer
          </h1>
          <ScrollDownArrow />
        </div>

      </main>
      <AboutSection />
    </div>
  );
}
