"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Linkedin, GitHub as Github } from "react-feather"

export default function Sidebar() {
    const handleGithubLink = () => {
        window.open("https://github.com/Curious-person/", "_blank")
    }

    const handleLinkedinLink = () => {
        window.open("https://www.linkedin.com/in/john-kevin-abgao-5893192b2", "_blank")
    }

    return (
        <aside className="w-120 bg-background h-screen sticky top-0">
            <div className="p-8 flex flex-col gap-16 h-screen justify-between">
                {/* header */}
                <div className="flex flex-col gap-4 items-start">
                    <h1>John Kevin Abgao</h1>
                    <p>Website developer based from Antipolo, Philippines</p>
                    <Link href="/about" className="w-full">
                        <Button variant="default" className="dark:hover:text-black w-full">
                            <User className="mr-2 h-4 w-4" />
                            About me
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <Button
                        onClick={handleLinkedinLink}
                        variant="default" className="dark:hover:text-black">
                        <Linkedin className="mr-2 h-4 w-4" />
                        Linkedin
                    </Button>
                    <Button
                        onClick={handleGithubLink}
                        variant="default" className="dark:hover:text-black">
                        <Github className="mr-2 h-4 w-4" />
                        Github
                    </Button>
                </div>
            </div>
        </aside>
    )
}
