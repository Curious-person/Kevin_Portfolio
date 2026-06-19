import Link from "next/link";
import { ArrowLeft } from "react-feather";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex justify-center py-24 px-8">
            <div className="max-w-2xl w-full flex flex-col gap-16">
                {/* Back Button */}
                <div>
                    <Link href="/">
                        <Button variant="outline" className="dark:text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Portfolio
                        </Button>
                    </Link>
                </div>

                {/* About Me Section / Blog Section */}
                <article className="flex flex-col gap-12 items-center text-center">
                    <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
                    
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                        <img 
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
                            alt="Workspace" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-8 text-lg leading-relaxed text-left">
                        <p>
                            Hello! I am John Kevin Abgao, a passionate website developer based in Antipolo, Philippines. 
                            I specialize in building dynamic, responsive, and beautiful web applications that provide 
                            meaningful experiences to users.
                        </p>
                        
                        <p>
                            With a strong foundation in modern web technologies like React, Next.js, and Tailwind CSS, 
                            I love turning complex problems into elegant, intuitive designs. My journey into web development 
                            started with a simple curiosity about how things work on the internet, and it has since blossomed 
                            into a full-time career.
                        </p>

                        <p>
                            When I am not coding, you can find me exploring the latest tech trends, contributing to open-source 
                            projects, or enjoying a good cup of coffee while brainstorming my next big idea. I am always open 
                            to new challenges and opportunities to learn and grow.
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
