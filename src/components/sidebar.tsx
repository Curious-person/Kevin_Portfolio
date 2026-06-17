import { Button } from "@/components/ui/button"

export default function Sidebar() {
    return (
        <aside className="w-120 bg-background h-screen sticky top-0">
            <div className="p-8 flex flex-col gap-16 h-screen justify-between">
                {/* header */}
                <div className="flex flex-col gap-4 items-start">
                    <h1>John Kevin Abgao</h1>
                    <p className="text-[#626262]">Website developer based from Antipolo, Philippines</p>
                    <Button variant="default">About me</Button>
                </div>
                <div className="flex flex-col gap-4 items-start">
                    <Button variant="default">Linkedin</Button>
                    <Button variant="default">Github</Button>
                </div>
            </div>
        </aside>
    )
}
