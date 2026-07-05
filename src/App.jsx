import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shell from './components/Shell'
import Hub from './pages/Hub'
import Study from './pages/Study'
import Timeline from './pages/Timeline'
import Library from './pages/Library'
import Memory from './pages/Memory'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Hub />} />
          <Route path="/library" element={<Library />} />
          <Route path="/app/study" element={<Study />} />
          <Route path="/app/study/:reference" element={<Study />} />
          <Route path="/app/timeline" element={<Timeline />} />
          <Route path="/app/timeline/:eventId" element={<Timeline />} />
          <Route path="/app/memory" element={<Memory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
