import { SavedMoneyChart } from "./SavedMoneyChart"
import { FuelChart } from "./FuelChart"
import { MaintenanceChart } from "./MaintenanceChart"
import { DataTable } from "./DataTable"

export const Overview = () => {
    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-gray-100 dark:bg-gray-500/30">
                    <SavedMoneyChart />
                </div>
                <div className="aspect-video rounded-xl bg-gray-100 dark:bg-gray-500/30">
                    <FuelChart />
                </div>
                <div className="aspect-video rounded-xl bg-gray-100 dark:bg-gray-500/30">
                    <MaintenanceChart />
                </div>
            </div>
            <div className="min-h-[90vh] flex-1 rounded-xl bg-gray-100 dark:bg-gray-500/30 p-4 ">
            <DataTable />
            </div>
        </>
    )
}