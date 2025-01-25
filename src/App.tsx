import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FleetManagement from './pages/FleetManagement'
import StudentManagement from './pages/StudentManagement'
import Settings from './pages/Settings'
import { Messages } from './pages/Messages'
import Notifications from './pages/Notifications'
import Students from './components/Students'
import Drivers from './components/Drivers'
import Parents from './components/Parents'
import RoutesManagement from './components/RoutesManagement'
import Reports from './components/Reports'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './components/mode-toggle'
import { LanguageSelector } from './components/language-selector'
import { SupportContact } from './pages/Support'
import LiveMap from './pages/live-map'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="live-map" element={<LiveMap />} />
          <Route path="fleet-management" element={<FleetManagement />} />
          <Route path="fleet-management/drivers" element={<Drivers />} />
          <Route path="fleet-management/routes" element={<RoutesManagement />} />
          <Route path="student-management" element={<StudentManagement />} />
          <Route path="student-management/students" element={<Students />} />
          <Route path="student-management/parents" element={<Parents />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/theme" element={<ModeToggle />} />
          <Route path="settings/language" element={<LanguageSelector />} />
          <Route path="settings/support" element={<SupportContact />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
