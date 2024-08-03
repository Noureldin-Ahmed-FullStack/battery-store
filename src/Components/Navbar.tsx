import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import Menu from '@mui/material/Menu';
// import TuneIcon from '@mui/icons-material/Tune';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';
// import { Divider,  List, ListItem, ListItemButton, ListItemIcon, ListItemText, PaletteMode, SwipeableDrawer } from '@mui/material';
import { PaletteMode, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useMyContext } from './useMyContext';
interface prop {
    ToggleTheme: () => void,
    Theme: PaletteMode | undefined,
    isHome: boolean
}

export default function Navbar(props: prop) {
    const { ToggleTheme, Theme, isHome } = props
    const { userDbData } = useMyContext();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const menuDarkmode = () => {
        ToggleTheme()
        setAnchorElNav(null);
    };


    return (
        <AppBar sx={{ backgroundColor: isHome ? 'transparent' : '', backgroundImage: (!isHome && Theme == 'light') ? "linear-gradient(-90deg,#905689, #5e50ad)" : "" }} className={isHome ? "blured" : "LightThemeNav"} position={isHome ? 'absolute' : 'static'}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ElectricCarIcon fontSize='large' className='outlined-text' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Box
                        className="noLink outlined-text"
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            ml: 2,
                            width: '15%',
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img className='w-100' src="https://ssniper.sirv.com/Images/other%20projects/logo.png" alt="Logo" />
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"

                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                                <MenuItem
                                    component={Link}
                                    className='noLink'
                                    to={'products'} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{'Products'}</Typography>
                                </MenuItem>

                            {userDbData?.role == 'admin' && <MenuItem
                                component={Link}
                                className='noLink'
                                to={'messages'} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Messages</Typography>
                            </MenuItem>}
                            <MenuItem onClick={menuDarkmode}>
                                <Typography textAlign="center">Darkmode</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box
                        className="noLink align-items-center justify-content-center outlined-text"
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            ml: 2,
                            width: '100px',
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <ElectricCarIcon className='outlined-text' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                        <img className='w-100 smallLogo' src="https://ssniper.sirv.com/Images/other%20projects/logo.png" alt="Logo" />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                component={Link}
                                className='noLink outlined-text'
                                to={'products'}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {'products'}
                            </Button>
                        {userDbData?.role == 'admin' && <Button
                            component={Link}
                            className='noLink outlined-text'
                            to={'messages'}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            messages
                        </Button>}
                        <Button color='inherit' onClick={ToggleTheme} sx={{ my: 2, color: 'white' }} startIcon={Theme == 'dark' ? <Brightness6OutlinedIcon /> : <Brightness6Icon />}>Darkmode</Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {/* <Tooltip followCursor title={'Toggle Theme'}>
                                <Button color='inherit' onClick={ToggleTheme} className='noLink outlined-text' size='large' >{Theme == 'dark' ? <Brightness6OutlinedIcon /> : <Brightness6Icon />}</Button>
                            </Tooltip> */}
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <Tooltip followCursor title={'sign-in'}>
                                <Button color='inherit' component={Link} className='noLink outlined-text' to='/sign-in' size='large' ><LoginIcon /></Button>
                            </Tooltip>

                        </SignedOut>
                        {/* <Button color='inherit' onClick={ToggleTheme} startIcon={Theme == 'dark' ? <Brightness6OutlinedIcon /> : <Brightness6Icon />} size='large' >Darkmode</Button> */}
                        {/* <SwipeableDrawer disableSwipeToOpen={false} onOpen={toggleDrawer(true)} open={open} anchor='right' onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </SwipeableDrawer> */}
                        {/* <Button color='inherit' sx={{ padding: '0' }} onClick={toggleDrawer(true)} size='large' ><MenuIcon fontSize='large' /></Button> */}

                        {/* {Theme == 'dark' ? <Brightness6OutlinedIcon /> : <Brightness6Icon />} */}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}