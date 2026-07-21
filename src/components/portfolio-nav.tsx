import Link from "next/link";

type PortfolioNavProps = {
    active?: "home" | "about" | "contact";
};

export function PortfolioNav({ active }: PortfolioNavProps) {
    const itemBase = "transition-opacity hover:opacity-80";
    const activeClass = "opacity-100";

    return (
        <header className="mx-auto flex w-full max-w-280 items-center justify-between gap-6 pt-4 text-white">
            <Link
                href="/"
                className="font-serif text-xl italic tracking-tight text-[#0392ea] sm:text-2xl"
            >
                Kevin Abgao
            </Link>

            <nav className="hidden rounded-lg bg-[#2e3441] px-8 py-4 text-sm font-medium shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:block">
                <ul className="flex items-center gap-24">
                    <li>
                        <Link
                            href="/"
                            className={`${itemBase} ${active === "home" ? activeClass : ""}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`${itemBase} ${active === "about" ? activeClass : ""}`}
                        >
                            About me
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={`${itemBase} ${active === "contact" ? activeClass : ""}`}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <a href="/#resume" className={itemBase}>
                            Resume
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
