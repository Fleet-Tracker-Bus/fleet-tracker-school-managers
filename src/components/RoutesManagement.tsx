'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2, MapPin } from 'lucide-react'
import LiveMap from "@/components/LiveMap"

interface Vehicle {
  id: number
  number: string
}

interface Student {
  id: number
  name: string
}

interface Route {
  id: number
  name: string
  startLocation: { lat: number, lng: number }
  endLocation: { lat: number, lng: number }
  startLocationName: string
  endLocationName: string
  assignedVehicle: Vehicle | null
  assignedStudents: Student[]
}

const initialRoutes: Route[] = [
  {
    id: 1,
    name: "Ahlen - riyad tetouan",
    startLocation: { lat: 40.7128, lng: -74.0060 },
    endLocation: { lat: 40.7580, lng: -73.9855 },
    startLocationName: "Ahlen, tanger",
    endLocationName: "riyad tetouan, tanger",
    assignedVehicle: { id: 1, number: "V001" },
    assignedStudents: [
      { id: 1, name: "Yassir bekkar" },
      { id: 2, name: "Rayan el mousawi" },
    ]
  },
  {
    id: 2,
    name: "Ibiria - riyad titoun",
    startLocation: { lat: 40.7128, lng: -74.0060 },
    endLocation: { lat: 40.7580, lng: -73.9855 },
    startLocationName: "Ibiria, tanger",
    endLocationName: "riyad titoun, tanger",
    assignedVehicle: { id: 1, number: "V002" },
    assignedStudents: [
      { id: 1, name: "Houda fikri" },
      { id: 2, name: "Yassine Hmamouch" },
    ]
  },
]

const vehicles: Vehicle[] = [
  { id: 1, number: "V001" },
  { id: 2, number: "V002" },
  { id: 3, number: "V003" }
]

const students: Student[] = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "Diana Ross" },
  { id: 5, name: "Eva Green" }
]

const center = {
  lat: 40.7128,
  lng: -74.0060
}

const zoom = 13;

export default function RoutesManagement() {
  const [routes, setRoutes] = useState<Route[]>(initialRoutes)
  const [newRoute, setNewRoute] = useState<Omit<Route, 'id'>>({
    name: '',
    startLocation: center,
    endLocation: center,
    startLocationName: '',
    endLocationName: '',
    assignedVehicle: null,
    assignedStudents: []
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isMapOpen, setIsMapOpen] = useState<'start' | 'end' | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewRoute(prev => ({ ...prev, [name]: value }))
  }

  const handleLocationInputChange = (type: 'start' | 'end', value: string) => {
    setNewRoute(prev => ({
      ...prev,
      [`${type}LocationName`]: value
    }))
  }

  const handleOpenMap = (type: 'start' | 'end') => {
    setIsMapOpen(type)
  }

  const handleMapSelect = (location: { lat: number, lng: number }) => {
    if (isMapOpen === 'start') {
      setNewRoute(prev => ({
        ...prev,
        startLocation: location,
        startLocationName: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
      }))
    } else if (isMapOpen === 'end') {
      setNewRoute(prev => ({
        ...prev,
        endLocation: location,
        endLocationName: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
      }))
    }
    setIsMapOpen(null)
  }

  const handleVehicleChange = (value: string) => {
    const vehicle = vehicles.find(v => v.id === parseInt(value))
    setNewRoute(prev => ({ ...prev, assignedVehicle: vehicle || null }))
  }

  const handleStudentChange = (value: string) => {
    const student = students.find(s => s.id === parseInt(value))
    if (student) {
      setNewRoute(prev => ({
        ...prev,
        assignedStudents: [...prev.assignedStudents, student]
      }))
    }
  }

  const handleRemoveStudent = (studentId: number) => {
    setNewRoute(prev => ({
      ...prev,
      assignedStudents: prev.assignedStudents.filter(s => s.id !== studentId)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId !== null) {
      setRoutes(routes.map(r => r.id === editingId ? { ...newRoute, id: editingId } : r))
      setEditingId(null)
    } else {
      const newId = Math.max(...routes.map(r => r.id), 0) + 1
      setRoutes([...routes, { ...newRoute, id: newId }])
    }
    setNewRoute({
      name: '',
      startLocation: center,
      endLocation: center,
      startLocationName: '',
      endLocationName: '',
      assignedVehicle: null,
      assignedStudents: []
    })
  }

  const handleEdit = (route: Route) => {
    setNewRoute(route)
    setEditingId(route.id)
  }

  const handleDelete = (id: number) => {
    setRoutes(routes.filter(r => r.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col gap-10 text-black dark:text-white p-4">
      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h1 className="font-bold text-lg">{editingId !== null ? 'Edit route' : 'Create new route'}</h1>
        <Input
          type="text"
          placeholder="Route name"
          name="name"
          value={newRoute.name}
          onChange={handleInputChange}
          required
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Location</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter start location"
              value={newRoute.startLocationName}
              onChange={(e) => handleLocationInputChange('start', e.target.value)}
              className="flex-grow"
            />
            <Button 
              type="button" 
              onClick={() => handleOpenMap('start')} 
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" /> Select
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Location</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter end location"
              value={newRoute.endLocationName}
              onChange={(e) => handleLocationInputChange('end', e.target.value)}
              className="flex-grow"
            />
            <Button 
              type="button" 
              onClick={() => handleOpenMap('end')} 
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" /> Select
            </Button>
          </div>
        </div>

        {isMapOpen && (
          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium">Select {isMapOpen === 'start' ? 'Start' : 'End'} Location on Map</label>
            <div className="bg-black w-full h-40 ">
            <LiveMap 
              center={center} 
              zoom={zoom} 
              onLocationSelect={handleMapSelect} 
            />
            </div>
          </div>
        )}

        <div className="space-y-2 hidden">
          <label className="text-sm font-medium">Assign Vehicle</label>
          <Select onValueChange={handleVehicleChange} value={newRoute.assignedVehicle?.id.toString() || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select a vehicle" />
            </SelectTrigger>
            <SelectContent className="bg-[#3C3C3C] text-white">
              {vehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                  {vehicle.number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Assign Students</label>
          <Select onValueChange={handleStudentChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select students" />
            </SelectTrigger>
            <SelectContent className="bg-[#3C3C3C] text-white">
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id.toString()}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {newRoute.assignedStudents.map((student) => (
              <div key={student.id} className="flex items-center bg-gray-700 rounded-full px-3 py-1">
                <span className="text-sm">{student.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-2 text-gray-400 hover:text-gray-200"
                  onClick={() => handleRemoveStudent(student.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full max-w-20 bg-white text-black hover:bg-white/50">
          {editingId !== null ? 'Update' : 'Create'}
        </Button>
      </form> */}

      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-lg">Liste des itinéraires (générée par l'IA)</h1>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-black dark:text-gray-300">Nom</TableHead>
                <TableHead className="text-black dark:text-gray-300">Lieu de départ</TableHead>
                <TableHead className="text-black dark:text-gray-300">Lieu d'arrivée</TableHead>
                <TableHead className="text-black dark:text-gray-300">Véhicule attribué</TableHead>
                <TableHead className="text-black dark:text-gray-300">Étudiants attribués</TableHead>
                <TableHead className="text-black dark:text-gray-300">Actions</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id} className="border-gray-700">
                  <TableCell className="text-black dark:text-gray-100">{route.name}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{route.startLocationName}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{route.endLocationName}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{route.assignedVehicle?.number || 'None'}</TableCell>
                  <TableCell className="text-black dark:text-gray-100">{route.assignedStudents.map(s => s.name).join(', ')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(route)}
                        size="icon"
                        variant="outline"
                        className="border-gray-500 text-black dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                        aria-label={`Edit route ${route.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(route.id)}
                        size="icon"
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600"
                        aria-label={`Delete route ${route.name}`}
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