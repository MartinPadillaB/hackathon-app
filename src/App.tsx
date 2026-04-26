import type { ReactNode } from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import './App.css'

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Hackathon Project Finder</h1>
        <nav aria-label="Main navigation">
          <ul>
            <li>
              <Link to="/enter-name">Enter name</Link>
            </li>
            <li>
              <Link to="/projects">Project list</Link>
            </li>
            <li>
              <Link to="/propose">Propose project</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  )
}

function EnterNameScreen() {
  return (
    <section className="screen">
      <h2>Enter name</h2>
      <p>Placeholder screen for the local name entry flow.</p>
    </section>
  )
}

function ProjectListScreen() {
  return (
    <section className="screen">
      <h2>Project list</h2>
      <p>Placeholder list view for mocked project cards.</p>
      <p>
        Example details route:{' '}
        <Link to="/projects/demo-project">Open demo project details</Link>
      </p>
    </section>
  )
}

function ProjectDetailsScreen() {
  const { projectId } = useParams()

  return (
    <section className="screen">
      <h2>Project details</h2>
      <p>Showing details for non-sensitive project id:</p>
      <code>{projectId}</code>
    </section>
  )
}

function ProposeProjectScreen() {
  return (
    <section className="screen">
      <h2>Propose project</h2>
      <p>Placeholder screen for proposing a new project.</p>
    </section>
  )
}

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/enter-name" replace />} />
        <Route path="/enter-name" element={<EnterNameScreen />} />
        <Route path="/projects" element={<ProjectListScreen />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsScreen />} />
        <Route path="/propose" element={<ProposeProjectScreen />} />
      </Routes>
    </AppLayout>
  )
}

export default App
