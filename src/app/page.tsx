import Sidebar from "@/components/sidebar";
import ImageCard from "@/components/imagecard";
import MountainScene from "@/components/mountain-scene";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex flex-col flex-1 min-w-0">
        {/* Hero — atmospheric mountain scene */}
        <MountainScene />

        <div className="grid grid-cols-2 gap-4 p-8 w-full">
          <ImageCard
            title="NU Space"
            description="Document Management System"
            imageSource="/images/nuspace_mockup.mp4" />
          <ImageCard />
          <ImageCard />
          <ImageCard
            title="Project ATL - Antipolo TODA Map"
            description="Interactive Map with Real-time TODA Tracking"
            imageSource={"/images/atl_media.png"} />
        </div>
      </main>
    </div>
  );
}
