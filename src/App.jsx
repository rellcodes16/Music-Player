import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
//import Player from './Components/Player'
// import AppLayout from './pages/AppLayout'
import Library from './Components/Library'
import Favorite from './Components/Favorite'
import { SongsProvider } from './Components/context/SongsContext'
// import HomePage from './pages/HomePage'
// import Login from './pages/Login'
import { AuthProvider } from './Components/context/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoutes'
import SpinnerFullPage from './Components/SpinnerFullPage'
import PlayerPage from './pages/PlayerPage'
// import { useEffect, useState } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))


function App() {

  
  return (
    <AuthProvider>
    <SongsProvider>
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='login' element={<Login />} />
          <Route path="player" element={<ProtectedRoute><PlayerPage /></ProtectedRoute>}/>
          <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate replace to='library' />} />
            <Route path="library" element={<Library/>} />
            <Route path="favorite" element={<Favorite />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter> 
    </SongsProvider>
    </AuthProvider>
  )
}

export default App
