import Link from "next/link";

type PortfolioNavProps = {
    active?: "home" | "about" | "contact";
    variant?: "white" | "blue";
};

export function PortfolioNav({ active, variant = "blue" }: PortfolioNavProps) {
    const itemBase = "transition-all duration-200 px-4 py-2 rounded-lg hover:bg-[#3e4451]";
    const activeClass = "bg-[#4e5461] text-white font-semibold";

    return (
        <header className="mx-auto flex w-full max-w-280 items-center justify-between gap-6 pt-4 text-white">
            <Link
                href="/"
                className={`font-serif text-xl italic tracking-tight sm:text-2xl ${variant === "white" ? "text-white" : "text-[#0392ea]"
                    }`}
            >
                Kevin Abgao
            </Link>

            <nav className="hidden rounded-lg bg-[#2e3441] px-6 py-3 text-sm font-medium md:block">
                <ul className="flex items-center gap-12">
                    <li>
                        <Link
                            href="/"
                            className={`${itemBase} ${active === "home" ? activeClass : "text-gray-300"}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`${itemBase} ${active === "about" ? activeClass : "text-gray-300"}`}
                        >
                            About me
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={`${itemBase} ${active === "contact" ? activeClass : "text-gray-300"}`}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <a href="/#resume" className={`${itemBase} text-gray-300`}>
                            Resume
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="w-40" />
        </header>
    );
}
