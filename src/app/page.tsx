import { ArrowUpRight, Code2, Cpu, Layout, Sparkles } from "lucide-react";
import Sidebar from "@/components/sidebar";
import ImageCard from "@/components/imagecard";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="grid grid-cols-2 gap-4 p-8 w-full">
        <ImageCard imageSource={"https://images.unsplash.com/photo-1581345837712-414b9b6fb450?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
        <ImageCard imageSource={"https://images.unsplash.com/photo-1581345837712-414b9b6fb450?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
        <ImageCard imageSource={"https://images.unsplash.com/photo-1581345837712-414b9b6fb450?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
        <ImageCard imageSource={"https://images.unsplash.com/photo-1581345837712-414b9b6fb450?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
      </div>
    </div>
  );
}
