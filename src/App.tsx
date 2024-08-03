
import { createTheme, responsiveFontSizes } from '@mui/material'
import { ThemeProvider } from '@mui/material';
import './App.css'
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar';
// import MovieList from './Components/MovieList';
import { Outlet, useLocation } from 'react-router-dom';
import { useMyContext } from './Components/useMyContext';
function App() {
  // const {Theme , ToggleTheme} = useContext(MyContext)
  const { Theme, ToggleTheme } = useMyContext();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/battery-store';
  let theme = createTheme({
    palette: {
      mode: Theme,
    }
  })

  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <div style={{ transition: 'background-color 0.5s ease-in-out, color 0.5s ease-in-out' }} className={`${Theme == 'dark' ? 'bg-dark text-light' : 'lightGreenBG text-dark'} w-100 d-flex flex-column flex-grow-1`}>
        <ToastContainer />
        <Navbar isHome={isHome} ToggleTheme={ToggleTheme} Theme={Theme} />
        {/* <MovieList Theme={Theme}/> */}
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App
