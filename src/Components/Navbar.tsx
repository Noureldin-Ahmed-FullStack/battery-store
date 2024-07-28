import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import LogoDevIcon from '@mui/icons-material/LogoDev';
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
const pages = ['products', 'contact', 'about'];
interface prop {
    ToggleTheme: () => void,
    Theme: PaletteMode | undefined,
    isHome: boolean
}

export default function Navbar(props: prop) {
    const { ToggleTheme, Theme, isHome } = props

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
        <AppBar sx={{ backgroundColor: isHome ? 'transparent' : '' }} className={isHome ? "blured" : ""} position={isHome ? 'absolute' : 'static'}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LogoDevIcon className='outlined-text' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        className="noLink outlined-text"
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Battery store
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            {pages.map((page) => (
                                <MenuItem key={page}
                                    component={Link}
                                    className='noLink'
                                    to={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}

                            <MenuItem onClick={menuDarkmode}>
                                <Typography textAlign="center">Darkmode</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <LogoDevIcon className='outlined-text' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        className="noLink outlined-text"
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Battery store
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={Link}
                                className='noLink outlined-text'
                                to={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
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