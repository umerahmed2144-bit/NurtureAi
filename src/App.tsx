import { Navigate, Route, Routes } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Feedback } from './pages/Feedback'
import { AppShell } from './pages/AppShell'
import { Home } from './pages/app/Home'
import { Dashboard } from './pages/app/Dashboard'
import { Activities } from './pages/app/Activities'
import { LogObservation } from './pages/app/LogObservation'
import { Report } from './pages/app/Report'
import { Assessment } from './pages/app/Assessment'
import { Referrals } from './pages/app/Referrals'
import { Onboarding } from './pages/app/Onboarding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/app" element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="activities" element={<Activities />} />
        <Route path="log" element={<LogObservation />} />
        <Route path="report" element={<Report />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="directory" element={<Referrals />} />
        <Route path="onboarding" element={<Onboarding />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
