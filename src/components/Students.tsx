'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Upload, Download } from 'lucide-react'
import * as XLSX from 'xlsx'
import LiveMapBox from "./LiveMap"

interface Student {
  id: number
  firstName: string
  lastName: string
  age: number
  grade: string
  houseLoaction: string
  parentId: string
}

const initialStudents: Student[] = [
  { id: 1, firstName: 'Yassine', lastName: 'el moukhtar', age: 15, grade: '10th', assignedRoute: 'Route A', parentId: 'P001' },
  { id: 2, firstName: 'ibrahim', lastName: 'yahya', age: 14, grade: '9th', assignedRoute: 'Route B', parentId: 'P002' },
  { id: 3, firstName: 'sara', lastName: 'el idrissi', age: 16, grade: '11th', assignedRoute: 'Route C', parentId: 'P003' },
]

const moroccoCenter = { lat: 31.7917, lng: -7.0926 };
const zoom = 4.5

export default function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id'>>({
    firstName: '',
    lastName: '',
    age: 0,
    grade: '',
    houseLoaction: '',
    parentId: ''
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  const [isMapOpen, setIsMapOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  console.log(newStudent)

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
    setNewStudent((prev) => ({
      ...prev,
      houseLoaction: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`, // Or use another format if needed
    }));
  };

  const toggleMap = () => {
    setIsMapOpen(!isMapOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewStudent(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) || 0 : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setStudents(
        students.map((s) =>
          s.id === editingId ? { ...s, ...newStudent } : s
        )
      );
      setEditingId(null);
    } else {
      const newId = Math.max(...students.map((s) => s.id), 0) + 1;
      setStudents([...students, { id: newId, ...newStudent }]);
    }
    setNewStudent({
      firstName: '',
      lastName: '',
      age: 0,
      grade: '',
      houseLoaction: '',
      parentId: '',
    });
    setSelectedLocation(null); // Reset location
  };
  

  const handleEdit = (student: Student) => {
    setNewStudent(student)
    setEditingId(student.id)
  }

  const handleDelete = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
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
        const data = XLSX.utils.sheet_to_json(ws) as Student[]
        setStudents([...students, ...data.map((s, index) => ({ ...s, id: students.length + index + 1 }))])
      }
      reader.readAsBinaryString(file)
    }
  }

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(students)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Students")
    XLSX.writeFile(wb, "students.xlsx")
  }

  return (
    <div className="flex min-h-screen flex-col gap-10 text-black dark:text-white p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h1 className="font-bold text-lg">{editingId !== null ? 'Modifier l\'élève' : 'Ajouter un nouvel élève'}</h1>
        <Input
          type="text"
          placeholder="Prénom"
          name="firstName"
          value={newStudent.firstName}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          placeholder="Nom de famille"
          name="lastName"
          value={newStudent.lastName}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          placeholder="Âge"
          name="age"
          value={newStudent.age || ''}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          placeholder="Classe"
          name="grade"
          value={newStudent.grade}
          onChange={handleInputChange}
          required
        />



        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={toggleMap}
            className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/80"
          >
            {isMapOpen ? 'Fermer la carte' : 'Sélectionner l\'emplacement de l\'élève'}
          </Button>

          {selectedLocation && (
            <div className="text-sm text-gray-600">
              Selected Location:
              Lat: {selectedLocation.lat.toFixed(4)},
              Lng: {selectedLocation.lng.toFixed(4)}
            </div>
          )}

          {isMapOpen && (
            <div className="w-full h-[400px] border rounded-lg overflow-hidden">
              <LiveMapBox
                center={selectedLocation == null ? moroccoCenter : selectedLocation}
                zoom={selectedLocation == null ? zoom : selectedLocation}
                onLocationSelect={handleLocationSelect}
                initialMarker={selectedLocation}
                showTracking={false}
              />
            </div>
          )}
        </div>
        <Input
          type="text"
          placeholder="Parent"
          name="parentId"
          value={newStudent.parentId}
          onChange={handleInputChange}
          required
        />

        <Button type="submit" className="w-full max-w-20 bg-black dark:bg-white text-white dark:text-black hover:bg-black/30 dark:hover:bg-white/50">
          {editingId !== null ? 'Update' : 'Add'}
        </Button>
      </form>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Liste des élèves</h1>
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
                <TableHead className="text-black dark:text-gray-300">Âge</TableHead>
                <TableHead className="text-black dark:text-gray-300">Classe</TableHead>
                <TableHead className="text-black dark:text-gray-300">Itinéraire attribué</TableHead>
                <TableHead className="text-black dark:text-gray-300">ID du parent</TableHead>
                <TableHead className="text-black dark:text-gray-300">Actions</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="border-gray-700">
                  <TableCell className="text-black dark:text-gray-100">{student.firstName}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{student.lastName}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{student.age}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{student.grade}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{student.assignedRoute}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{student.parentId}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(student)}
                        size="icon"
                        variant="outline"
                        className="border-gray-500 text-black dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                        aria-label={`Edit student ${student.firstName} ${student.lastName}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(student.id)}
                        size="icon"
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600"
                        aria-label={`Delete student ${student.firstName} ${student.lastName}`}
                      >
                        <Trash2 className="h-4 w-4" />
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