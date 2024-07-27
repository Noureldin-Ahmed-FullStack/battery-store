
import { createTheme, PaletteMode } from '@mui/material'
import { ThemeProvider } from '@mui/material';
import './App.css'
import Navbar from './Components/Navbar';
import { useState } from 'react';
// import MovieList from './Components/MovieList';
import { Outlet, useLocation } from 'react-router-dom';
function App() {
  const [Theme, setTheme] = useState<PaletteMode>('light')
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/battery-store';
  
  const ToggleTheme = () => {
    Theme == 'dark' ? setTheme('light') : setTheme('dark')
  }
  const theme = createTheme({
    palette: {
      mode: Theme
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className={`${Theme == 'dark' ? 'bg-dark text-light' : 'lightGreenBG text-dark'} w-100 d-flex flex-column flex-grow-1`}>
        <Navbar isHome={isHome} ToggleTheme={ToggleTheme} Theme={Theme} />
        {/* <MovieList Theme={Theme}/> */}
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App
