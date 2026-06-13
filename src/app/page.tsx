import { Button, buttonVariants } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-border/40 bg-background/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight hover:opacity-85 transition-opacity">
            Kevin<span className="text-muted-foreground font-normal">.dev</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
          <a href="#contact" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Hire Me
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
              Crafting premium digital experiences
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              I am a passionate software engineer designing and building modern web applications that combine clean code with exceptional aesthetics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a href="#contact" className={buttonVariants({ size: "lg" })}>
                Let&apos;s Collaborate
              </a>
              <a href="#about" className={buttonVariants({ size: "lg", variant: "outline" })}>
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Dynamic Split Section (About / Contact Form) */}
        <section id="about" className="py-16 md:py-24 border-t border-border/20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Info Column (Left 7 Columns on Large Screens) */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">About Me</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Focusing on modern UI architecture and visual precision.</h2>
                <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                  With years of frontend engineering experience, I build design systems that scale and applications that work seamlessly. I specialize in Next.js, React, TypeScript, and fine-tuning styles for native responsive experiences.
                </p>
              </div>

              {/* Skills Showcase Section */}
              <div id="skills" className="space-y-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block">Key Capabilities</span>
                <div className="flex flex-wrap gap-2.5">
                  {["React / Next.js", "TypeScript", "Tailwind CSS v4", "Design Systems", "shadcn / Radix", "Responsive UI", "Web Performance", "API Integration"].map((skill) => (
                    <span 
                      key={skill}
                      className="px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border border-border bg-card text-foreground shadow-sm hover:scale-[1.03] transition-transform duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Card */}
              <div className="glass-panel p-6 md:p-8 space-y-4 bg-card/50">
                <h3 className="text-lg md:text-xl font-bold tracking-tight">Current Philosophy</h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  &ldquo;Simplicity is the ultimate sophistication.&rdquo; Every line of code and style decision should serve a purposeful role in crafting an intuitive user flow and a breathtaking visual journey.
                </p>
              </div>
            </div>

            {/* Contact Form Column (Right 5 Columns on Large Screens) */}
            <div id="contact" className="lg:col-span-5 w-full">
              <ContactForm />
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 py-10 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Kevin. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
