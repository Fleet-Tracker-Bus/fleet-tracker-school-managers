'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from 'lucide-react'
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { sampleReportData } from './reportSampleData'

type ReportType = 'students' | 'parents' | 'drivers' | 'vehicles' | 'fuel' | 'maintenance' | 'financial'

const reportTypes: { value: ReportType; label: string }[] = [
  { value: 'students', label: 'Rapport des élèves' },
  { value: 'parents', label: 'Rapport des parents' },
  { value: 'drivers', label: 'Rapport des conducteurs' },
  { value: 'vehicles', label: 'Rapport des véhicules' },
  { value: 'fuel', label: 'Rapport de consommation de carburant' },
  { value: 'maintenance', label: 'Rapport de maintenance' },
  { value: 'financial', label: 'Rapport financier' },
]

const mockReportData = sampleReportData

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('students')
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  })

  const filteredReportData = mockReportData[selectedReport].filter((item) => {
    const itemDate = new Date(item.date)
    return (
      (!dateRange?.from || itemDate >= dateRange.from) &&
      (!dateRange?.to || itemDate <= dateRange.to)
    )
  })

  const handleDownload = () => {
    const csvContent = [
      ['Date', 'Value', 'Details'],
      ...filteredReportData.map((item) => [item.date, item.value.toString(), item.details]),
    ].map((row) => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${selectedReport}_report.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen text-black dark:text-white">
      <h1 className="text-2xl font-bold text-black dark:text-white">Reports Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1 bg-gray-100 dark:bg-[#4C4C4C] border-hidden">
          <CardHeader>
            <CardTitle>Sélectionner le type de rapport</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={(value) => setSelectedReport(value as ReportType)} defaultValue={selectedReport}>
              <SelectTrigger className="bg-white dark:bg-[#3C3C3C] text-black dark:text-gray-400 border-hidden">
                <SelectValue placeholder="Select a report type" />
              </SelectTrigger>
              <SelectContent className="bg-[#3C3C3C] text-white">
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card className="flex-1 bg-gray-100 dark:bg-[#4C4C4C] border-hidden">
          <CardHeader>
            <CardTitle>Sélectionner la plage de dates</CardTitle>
          </CardHeader>
          <CardContent>
            <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
          </CardContent>
        </Card>
      </div>
      <Card className=" bg-gray-100 dark:bg-[#4C4C4C] border-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{reportTypes.find((type) => type.value === selectedReport)?.label}</CardTitle>
          <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white">
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReportData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{format(new Date(item.date), 'PP')}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}