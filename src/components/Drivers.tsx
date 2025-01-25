'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Upload, Download, MessageCircle, Mail } from 'lucide-react'
import * as XLSX from 'xlsx'

interface Driver {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
}

const initialDrivers: Driver[] = [
  { id: 1, firstName: 'Mustapha', lastName: 'Dosari', email: 'mustapha.aldosari@example.com', phone: '+1234567890' },
  { id: 2, firstName: 'Ahmed', lastName: 'Fahad', email: 'ahmed.alfahad@example.com', phone: '+1987654321' },
  { id: 3, firstName: 'Ali', lastName: 'Hamdan', email: 'ali.alhamdan@example.com', phone: '+1122334455' },
  { id: 4, firstName: 'Khalid', lastName: 'Mansoor', email: 'khalid.almansoor@example.com', phone: '+1122334455' },
  { id: 5, firstName: 'Omar', lastName: 'Salem', email: 'omar.alsalem@example.com', phone: '+1122334455' },
  { id: 6, firstName: 'Youssef', lastName: 'Rashid', email: 'youssef.alrashid@example.com', phone: '+1122334455' },
]


export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers)
  const [newDriver, setNewDriver] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewDriver(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId !== null) {
      setDrivers(drivers.map(d => d.id === editingId ? { ...d, ...newDriver } : d))
      setEditingId(null)
    } else {
      const newId = Math.max(...drivers.map(d => d.id), 0) + 1
      setDrivers([...drivers, { id: newId, ...newDriver }])
    }
    setNewDriver({ firstName: '', lastName: '', email: '', phone: '' })
  }

  const handleEdit = (driver: Driver) => {
    setNewDriver(driver)
    setEditingId(driver.id)
  }

  const handleDelete = (id: number) => {
    setDrivers(drivers.filter(d => d.id !== id))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (evt) => {
        const bstr = evt.target?.result
        const wb = XLSX.read(bstr, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws) as Driver[]
        setDrivers([...drivers, ...data.map((d, index) => ({ ...d, id: drivers.length + index + 1 }))])
      }
      reader.readAsBinaryString(file)
    }
  }

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(drivers)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Drivers")
    XLSX.writeFile(wb, "drivers.xlsx")
  }

  const handleMessage = (phone: string) => {
    window.open(`sms:${phone}`, '_blank')
  }

  const handleResendLogin = (email: string) => {
    // This is a placeholder function. In a real application, you would call your backend API here.
    console.log(`Resending login information to ${email}`)
    alert(`Login information resent to ${email}`)
  }

  return (
    <div className="flex min-h-screen flex-col gap-10 text-black dark:text-white p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h1 className="font-bold text-lg">{editingId !== null ? 'Modifier le conducteur' : 'Créer un conducteur'}</h1>
        <Input
          type="text"
          placeholder="Prénom"
          name="firstName"
          value={newDriver.firstName}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          placeholder="Nom de famille"
          name="lastName"
          value={newDriver.lastName}
          onChange={handleInputChange}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={newDriver.email}
          onChange={handleInputChange}
          required
        />
        <Input
          type="tel"
          placeholder="Numéro de téléphone"
          name="phone"
          value={newDriver.phone}
          onChange={handleInputChange}
          required
        />

        <Button type="submit" className="w-full max-w-20 bg-black dark:bg-white text-white dark:text-black hover:bg-black/30 dark:hover:bg-white/50">
          {editingId !== null ? 'Update' : 'Create'}
        </Button>
      </form>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Vos conducteurs</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-green-500 hover:bg-green-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Import Excel
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button onClick={handleExport} className="bg-blue-500 hover:bg-blue-600">
              <Upload className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
              <TableHead className="text-black dark:text-gray-300">Prénom</TableHead>
<TableHead className="text-black dark:text-gray-300">Nom de famille</TableHead>
<TableHead className="text-black dark:text-gray-300">Email</TableHead>
<TableHead className="text-black dark:text-gray-300">Téléphone</TableHead>
<TableHead className="text-black dark:text-gray-300">Actions</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id} className="border-gray-700">
                  <TableCell className="text-black dark:text-gray-100">{driver.firstName}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{driver.lastName}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{driver.email}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{driver.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(driver)}
                        size="icon"
                        variant="outline"
                        className="border-gray-500 text-black dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                        aria-label={`Edit driver ${driver.firstName} ${driver.lastName}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(driver.id)}
                        size="icon"
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600"
                        aria-label={`Delete driver ${driver.firstName} ${driver.lastName}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleMessage(driver.phone)}
                        size="icon"
                        className="bg-green-500 hover:bg-green-600"
                        aria-label={`Message driver ${driver.firstName} ${driver.lastName}`}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleResendLogin(driver.email)}
                        size="icon"
                        className="bg-yellow-500 hover:bg-yellow-600"
                        aria-label={`Resend login information to ${driver.firstName} ${driver.lastName}`}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}