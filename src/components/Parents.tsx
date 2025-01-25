'use client'

import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Upload, Download, MessageCircle, Mail } from 'lucide-react'
import * as XLSX from 'xlsx'

interface Kid {
  id: number
  name: string
}

interface Parent {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  kids: Kid[]
}

const initialParents: Parent[] = [
  { id: 1, firstName: 'El Aarbi', lastName: 'Bouchama', email: 'aarbi@example.com', phone: '+1234567890', kids: [{ id: 1, name: 'Omar Bouchama' }, { id: 2, name: 'Rami Bouchama' }] },
  { id: 2, firstName: 'Naji', lastName: 'Ben El Housine', email: 'naji.smith@example.com', phone: '+1987654321', kids: [{ id: 3, name: 'Khalid Ben El Housine' }] },
  { id: 3, firstName: 'Hassan', lastName: 'Lksir', email: 'lksir.hassan@example.com', phone: '+1122334455', kids: [{ id: 4, name: 'Tariq Lksir' }, { id: 5, name: 'Ali Lksir' }] },
]


export default function Parents() {
  const [parents, setParents] = useState<Parent[]>(initialParents)
  const [newParent, setNewParent] = useState<Omit<Parent, 'id' | 'kids'>>({ firstName: '', lastName: '', email: '', phone: '' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewParent(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId !== null) {
      setParents(parents.map(p => p.id === editingId ? { ...p, ...newParent } : p))
      setEditingId(null)
    } else {
      const newId = Math.max(...parents.map(p => p.id), 0) + 1
      setParents([...parents, { id: newId, ...newParent, kids: [] }])
    }
    setNewParent({ firstName: '', lastName: '', email: '', phone: '' })
  }

  const handleEdit = (parent: Parent) => {
    setNewParent(parent)
    setEditingId(parent.id)
  }

  const handleDelete = (id: number) => {
    setParents(parents.filter(p => p.id !== id))
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
        const data = XLSX.utils.sheet_to_json(ws) as Parent[]
        setParents([...parents, ...data.map((p, index) => ({ ...p, id: parents.length + index + 1, kids: [] }))])
      }
      reader.readAsBinaryString(file)
    }
  }

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(parents)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Parents")
    XLSX.writeFile(wb, "parents.xlsx")
  }

  const handleMessage = (phone: string) => {
    window.open(`sms:${phone}`, '_blank')
  }

  const handleResendAuth = (email: string) => {
    // This is a placeholder function. In a real application, you would call your backend API here.
    console.log(`Resending authentication data to ${email}`)
    alert(`Authentication data resent to ${email}`)
  }

  const handleViewKid = (kidId: number) => {
    navigate(`/students?kidId=${kidId}`);
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 text-black dark:text-white p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h1 className="font-bold text-lg">{editingId !== null ? 'Modifier le parent' : 'Ajouter un nouveau parent'}</h1>
        <Input
          type="text"
          placeholder="Prénom"
          name="firstName"
          value={newParent.firstName}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          placeholder="Nom de famille"
          name="lastName"
          value={newParent.lastName}
          onChange={handleInputChange}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={newParent.email}
          onChange={handleInputChange}
          required
        />
        <Input
          type="tel"
          placeholder="Numéro de téléphone"
          name="phone"
          value={newParent.phone}
          onChange={handleInputChange}
          required
        />


        <Button type="submit" className="w-full max-w-20 bg-black dark:bg-white text-white dark:text-black hover:bg-black/30 dark:hover:bg-white/50">
          {editingId !== null ? 'Update' : 'Add'}
        </Button>
      </form>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Liste des parents</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-green-500 hover:bg-green-600"
            >
              <Upload className="h-4 w-4 mr-2" />
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
              <Download className="h-4 w-4 mr-2" />
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
                <TableHead className="text-black dark:text-gray-300">Enfants</TableHead>
                <TableHead className="text-black dark:text-gray-300">Actions</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {parents.map((parent) => (
                <TableRow key={parent.id} className="border-gray-700">
                  <TableCell className="text-black dark:text-gray-100">{parent.firstName}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{parent.lastName}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{parent.email}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{parent.phone}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">
                    {parent.kids.map((kid) => (
                      <Button
                        key={kid.id}
                        onClick={() => handleViewKid(kid.id)}
                        variant="link"
                        className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
                      >
                        {kid.name + ", "}
                      </Button>
                    ))}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(parent)}
                        size="icon"
                        variant="outline"
                        className="border-gray-500 text-black dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                        aria-label={`Edit parent ${parent.firstName} ${parent.lastName}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(parent.id)}
                        size="icon"
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600"
                        aria-label={`Delete parent ${parent.firstName} ${parent.lastName}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleMessage(parent.phone)}
                        size="icon"
                        className="bg-green-500 hover:bg-green-600"
                        aria-label={`Message parent ${parent.firstName} ${parent.lastName}`}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleResendAuth(parent.email)}
                        size="icon"
                        className="bg-yellow-500 hover:bg-yellow-600"
                        aria-label={`Resend authentication data to ${parent.firstName} ${parent.lastName}`}
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