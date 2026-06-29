import { Routes, Route } from 'react-router-dom'
import TitlePage from './pages/TitlePage'
import CharacterCreationPage from './pages/CharacterCreationPage'
import MainGamePage from './pages/MainGamePage'
import InventoryPage from './pages/InventoryPage'
import NotesPage from './pages/NotesPage'
import RoomPage from './pages/RoomPage'
import SettingsPage from './pages/SettingsPage'
import EndingPage from './pages/EndingPage'

function App() {
  return (
    <div className="min-h-screen bg-horror-bg text-horror-text-primary">
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/create" element={<CharacterCreationPage />} />
        <Route path="/game" element={<MainGamePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/ending" element={<EndingPage />} />
      </Routes>
    </div>
  )
}

export default App
