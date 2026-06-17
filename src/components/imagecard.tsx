
export default function ImageCard({ imageSource }: { imageSource: string }) {
    return (
        <div className="w-full aspect-square">
            <img src={imageSource} alt="" className="w-full h-full object-cover rounded-[40px]" />
        </div>
    )
}
