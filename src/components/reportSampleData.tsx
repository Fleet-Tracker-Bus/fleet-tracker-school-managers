import { subDays } from 'date-fns'

const today = new Date()

export const sampleReportData = {
  students: [
    { id: 's1', date: subDays(today, 30).toISOString().split('T')[0], value: 150, details: 'Total active students' },
    { id: 's2', date: subDays(today, 25).toISOString().split('T')[0], value: 148, details: '2 students inactive' },
    { id: 's3', date: subDays(today, 20).toISOString().split('T')[0], value: 152, details: '4 new students added' },
    { id: 's4', date: subDays(today, 15).toISOString().split('T')[0], value: 155, details: '3 students transferred in' },
    { id: 's5', date: subDays(today, 10).toISOString().split('T')[0], value: 153, details: '2 students graduated' },
    { id: 's6', date: subDays(today, 5).toISOString().split('T')[0], value: 158, details: '5 new enrollments' },
    { id: 's7', date: today.toISOString().split('T')[0], value: 160, details: '2 students returned from leave' },
  ],
  parents: [
    { id: 'p1', date: subDays(today, 30).toISOString().split('T')[0], value: 130, details: 'Total registered parents' },
    { id: 'p2', date: subDays(today, 25).toISOString().split('T')[0], value: 132, details: '2 new parent registrations' },
    { id: 'p3', date: subDays(today, 20).toISOString().split('T')[0], value: 131, details: '1 parent account deactivated' },
    { id: 'p4', date: subDays(today, 15).toISOString().split('T')[0], value: 135, details: '4 new parent sign-ups' },
    { id: 'p5', date: subDays(today, 10).toISOString().split('T')[0], value: 138, details: '3 parents added second child' },
    { id: 'p6', date: subDays(today, 5).toISOString().split('T')[0], value: 140, details: '2 new family registrations' },
    { id: 'p7', date: today.toISOString().split('T')[0], value: 142, details: '2 parents reactivated accounts' },
  ],
  drivers: [
    { id: 'd1', date: subDays(today, 30).toISOString().split('T')[0], value: 20, details: 'Total active drivers' },
    { id: 'd2', date: subDays(today, 25).toISOString().split('T')[0], value: 19, details: '1 driver on leave' },
    { id: 'd3', date: subDays(today, 20).toISOString().split('T')[0], value: 21, details: '2 new drivers hired' },
    { id: 'd4', date: subDays(today, 15).toISOString().split('T')[0], value: 22, details: '1 driver returned from leave' },
    { id: 'd5', date: subDays(today, 10).toISOString().split('T')[0], value: 21, details: '1 driver retired' },
    { id: 'd6', date: subDays(today, 5).toISOString().split('T')[0], value: 23, details: '2 seasonal drivers added' },
    { id: 'd7', date: today.toISOString().split('T')[0], value: 24, details: '1 new driver completed training' },
  ],
  vehicles: [
    { id: 'v1', date: subDays(today, 30).toISOString().split('T')[0], value: 15, details: 'Total operational vehicles' },
    { id: 'v2', date: subDays(today, 25).toISOString().split('T')[0], value: 14, details: '1 vehicle under maintenance' },
    { id: 'v3', date: subDays(today, 20).toISOString().split('T')[0], value: 16, details: '2 new vehicles added to fleet' },
    { id: 'v4', date: subDays(today, 15).toISOString().split('T')[0], value: 15, details: '1 vehicle decommissioned' },
    { id: 'v5', date: subDays(today, 10).toISOString().split('T')[0], value: 17, details: '2 vehicles leased for peak season' },
    { id: 'v6', date: subDays(today, 5).toISOString().split('T')[0], value: 16, details: '1 vehicle returned from long-term repair' },
    { id: 'v7', date: today.toISOString().split('T')[0], value: 18, details: '2 new electric buses added' },
  ],
  fuel: [
    { id: 'f1', date: subDays(today, 30).toISOString().split('T')[0], value: 500, details: 'Total fuel consumption (liters)' },
    { id: 'f2', date: subDays(today, 25).toISOString().split('T')[0], value: 480, details: 'Reduced consumption due to route optimization' },
    { id: 'f3', date: subDays(today, 20).toISOString().split('T')[0], value: 510, details: 'Increased consumption due to longer routes' },
    { id: 'f4', date: subDays(today, 15).toISOString().split('T')[0], value: 495, details: 'Normal consumption levels' },
    { id: 'f5', date: subDays(today, 10).toISOString().split('T')[0], value: 520, details: 'Higher consumption due to AC usage' },
    { id: 'f6', date: subDays(today, 5).toISOString().split('T')[0], value: 490, details: 'Slight decrease due to 2 electric buses' },
    { id: 'f7', date: today.toISOString().split('T')[0], value: 485, details: 'Further reduction with more electric buses' },
  ],
  maintenance: [
    { id: 'm1', date: subDays(today, 30).toISOString().split('T')[0], value: 2, details: 'Vehicles under routine maintenance' },
    { id: 'm2', date: subDays(today, 25).toISOString().split('T')[0], value: 1, details: 'Emergency repair for 1 vehicle' },
    { id: 'm3', date: subDays(today, 20).toISOString().split('T')[0], value: 3, details: 'Scheduled maintenance for 3 vehicles' },
    { id: 'm4', date: subDays(today, 15).toISOString().split('T')[0], value: 0, details: 'All vehicles operational' },
    { id: 'm5', date: subDays(today, 10).toISOString().split('T')[0], value: 2, details: '2 vehicles in for annual inspection' },
    { id: 'm6', date: subDays(today, 5).toISOString().split('T')[0], value: 1, details: '1 vehicle undergoing major repair' },
    { id: 'm7', date: today.toISOString().split('T')[0], value: 2, details: '2 new electric buses in for initial check' },
  ],
  financial: [
    { id: 'fin1', date: subDays(today, 30).toISOString().split('T')[0], value: 50000, details: 'Monthly revenue' },
    { id: 'fin2', date: subDays(today, 25).toISOString().split('T')[0], value: 42000, details: 'Operational costs' },
    { id: 'fin3', date: subDays(today, 20).toISOString().split('T')[0], value: 8000, details: 'Net profit' },
    { id: 'fin4', date: subDays(today, 15).toISOString().split('T')[0], value: 52000, details: 'Increased revenue from new routes' },
    { id: 'fin5', date: subDays(today, 10).toISOString().split('T')[0], value: 45000, details: 'Higher costs due to fuel prices' },
    { id: 'fin6', date: subDays(today, 5).toISOString().split('T')[0], value: 7000, details: 'Reduced profit margin' },
    { id: 'fin7', date: today.toISOString().split('T')[0], value: 55000, details: 'Revenue boost from school trip contracts' },
  ],
}