import { Overview } from "@/components/Overview"

const Dashboard = () => {
  // const center = [-122.4194, 37.7749];
  // const zoom = 13;
  return (
    <div className="p-4 flex flex-col gap-4 bg-white dark:bg-[#2B2B2B]">
      <Overview />
    </div>
  )
}
export default Dashboard