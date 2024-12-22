"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type DriverData = {
    id: string
    driverName: string
    status: "active" | "absent" | "inactive"
    pickedUpKids: number
    droppedOffKids: number
    vehicleSpeed: number // in km/h
}

const data: DriverData[] = [
    { id: "1", driverName: "Khalid qasimi", status: "active", pickedUpKids: 10, droppedOffKids: 8, vehicleSpeed: 45 },
    { id: "2", driverName: "Yassine bidan", status: "absent", pickedUpKids: 0, droppedOffKids: 0, vehicleSpeed: 0 },
    { id: "3", driverName: "Mohammed basim", status: "active", pickedUpKids: 15, droppedOffKids: 15, vehicleSpeed: 60 },
    { id: "4", driverName: "Jamal yahya", status: "inactive", pickedUpKids: 0, droppedOffKids: 0, vehicleSpeed: 0 },
    { id: "5", driverName: "Mustapha mahmoud", status: "active", pickedUpKids: 8, droppedOffKids: 5, vehicleSpeed: 30 },
    { id: "6", driverName: "Akram lmjdoubi", status: "active", pickedUpKids: 12, droppedOffKids: 12, vehicleSpeed: 40 },
    { id: "7", driverName: "Ilyas bouazza", status: "absent", pickedUpKids: 0, droppedOffKids: 0, vehicleSpeed: 0 },
    { id: "8", driverName: "Kassem el khloufi", status: "active", pickedUpKids: 7, droppedOffKids: 7, vehicleSpeed: 50 },
    { id: "9", driverName: "Hassan tounsi", status: "active", pickedUpKids: 20, droppedOffKids: 18, vehicleSpeed: 55 },
    { id: "10", driverName: "Bilal ammar", status: "inactive", pickedUpKids: 0, droppedOffKids: 0, vehicleSpeed: 0 },
    { id: "11", driverName: "Hachem ibrahim", status: "active", pickedUpKids: 10, droppedOffKids: 9, vehicleSpeed: 42 },
    { id: "12", driverName: "Ilyas bouazza", status: "active", pickedUpKids: 5, droppedOffKids: 3, vehicleSpeed: 25 },
    { id: "13", driverName: "Mustapha mahmoud", status: "absent", pickedUpKids: 0, droppedOffKids: 0, vehicleSpeed: 0 },
    { id: "14", driverName: "Yousef bidan", status: "inactive", pickedUpKids: 0, droppedOffKids: 0, vehicleSpeed: 0 },
    { id: "15", driverName: "Khalid qasimi", status: "active", pickedUpKids: 18, droppedOffKids: 16, vehicleSpeed: 65 },
    { id: "16", driverName: "Mohammed ammar", status: "active", pickedUpKids: 9, droppedOffKids: 8, vehicleSpeed: 32 },
    { id: "17", driverName: "Ahmed bennaj", status: "active", pickedUpKids: 11, droppedOffKids: 9, vehicleSpeed: 35 },
    { id: "18", driverName: "oualid sayeh", status: "active", pickedUpKids: 14, droppedOffKids: 12, vehicleSpeed: 48 },
    { id: "19", driverName: "Jamal yahya", status: "absent", pickedUpKids: 0, droppedOffKids: 0, vehicleSpeed: 0 },
    { id: "20", driverName: "Hassan tounsi", status: "active", pickedUpKids: 6, droppedOffKids: 6, vehicleSpeed: 38 },
]


export const columns: ColumnDef<DriverData>[] = [
    {
        accessorKey: "driverName",
        header: "Nom du conducteur",
        cell: ({ row }) => <div className="capitalize">{row.getValue("driverName")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span className={`capitalize ${row.getValue("status") === "active" ? "text-green-500" : row.getValue("status") === "absent" ? "text-red-500" : "text-gray-500"}`}>
                {row.getValue("status")}
            </span>
        ),
    },
    {
        accessorKey: "pickedUpKids",
        header: "Enfants récupérés",
        cell: ({ row }) => <div className="text-center">{row.getValue("pickedUpKids")}</div>,
    },
    {
        accessorKey: "droppedOffKids",
        header: "Enfants déposés",
        cell: ({ row }) => <div className="text-center">{row.getValue("droppedOffKids")}</div>,
    },
    {
        accessorKey: "vehicleSpeed",
        header: "Vitesse du véhicule (km/h)",
        cell: ({ row }) => <div className="text-right">{row.getValue("vehicleSpeed")} km/h</div>,
    },

]

export function DataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full text-black dark:text-white">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrer les conducteurs...."
                    value={(table.getColumn("driverName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("driverName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                        Colonnes <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#2B2B2B] text-white" align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} Ligne(s) sélectionnée(s).
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Précédent
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Suivant
                    </Button>
                </div>
            </div>
        </div>
    )
}
