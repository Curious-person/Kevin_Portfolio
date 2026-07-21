"use client"

import Link from "next/link"
import { User, Linkedin, GitHub as Github } from "react-feather"

const buttonClassName =
    "inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 dark:hover:text-black"

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
                        <span className={`${buttonClassName} w-full`}>
                            <User className="mr-2 h-4 w-4" />
                            About me
                        </span>
                    </Link>
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <button
                        type="button"
                        onClick={handleLinkedinLink}
                        className={buttonClassName}>
                        <Linkedin className="mr-2 h-4 w-4" />
                        Linkedin
                    </button>
                    <button
                        type="button"
                        onClick={handleGithubLink}
                        className={buttonClassName}>
                        <Github className="mr-2 h-4 w-4" />
                        Github
                    </button>
                </div>
            </div>
        </aside>
    )
}
