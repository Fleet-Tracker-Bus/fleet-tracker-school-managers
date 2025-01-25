import LiveMapBox from "@/components/LiveMap"

const LiveMap = () => {
  const moroccoCenter = { lat: 31.7917, lng: -7.0926 };
  const zoom = 5.7
  return (
    <div className="max-h-[92vh] h-screen text-white text-lg font-bold flex justify-center items-start">
      <div className="relative w-full h-full">
        <LiveMapBox center={moroccoCenter} zoom={zoom} showTracking={true} />
      </div>
    </div>
  )
}

export default LiveMap