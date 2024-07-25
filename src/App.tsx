
import { createTheme, PaletteMode } from '@mui/material'
import { ThemeProvider } from '@mui/material';
import './App.css'
import Navbar from './Components/Navbar';
import { useState } from 'react';
// import MovieList from './Components/MovieList';
import { Outlet } from 'react-router-dom';
function App() {
  const [Theme, setTheme] = useState<PaletteMode>('dark')

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
      <Navbar ToggleTheme={ToggleTheme} Theme={Theme} />
      <div className={`${Theme == 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'} w-100 d-flex flex-column flex-grow-1 pt-3`}>
        {/* <MovieList Theme={Theme}/> */}
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App
