import React, {useState} from "react";
import { Button, AppBar, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem, Box, Link } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useNavigate} from 'react-router-dom';
import {logout, auth} from "../configs/firebase";
import {useAuthState} from "react-firebase-hooks/auth";

const pages = ['MyFood'];
const settings = ['Logout'];

const Navbar = () => {

    const navigasi = useNavigate();
    const [user] = useAuthState(auth);
    const [menu, setmenu] = useState(null);
    const [menuUser, setmenuUser] = useState(null);

    const menuOpen = (event) => {
        setmenu(event.currentTarget);
    };
    const menuUserOpen = (event) => {
        setmenuUser(event.currentTarget);
    };

    const menuClose = () => {
        setmenu(null);
    };

    const menuUserClose = () => {
        setmenuUser(null);
    };

    const tekanLogout = async () => {
        await logout()
        navigasi('/');
    }
    
    return (
        <div sx={{ backgroundColor:"black" }}>
            <AppBar position="static" sx={{backgroundColor:"#0578eb91", borderRadius:"10px"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={menuOpen}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={menu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(menu)}
                    onClose={menuClose}
                    sx={{
                        display: { xs: 'block', md: 'none' }
                    }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={menuClose}>
                        <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={menuClose}
                        sx={{ my: 2, color: 'black', display: 'block', fontWeight:"bold", textTransform: 'nones' }}
                    >
                        <Link href="/" underline="none"><Typography sx={{ color:"black", fontWeight: "bold" }}>{page}</Typography></Link>
                    </Button>
                    ))}
                </Box>
        
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open">
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={menuUserOpen}
                        color="inherit"
                    >
                        {user ? <AccountCircle sx={{color:"black"}}/> : ''}
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={menuUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(menuUser)}
                    onClose={menuUserClose}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={menuUserClose}>
                        <Button style={{ marginRight:"0.5em", color:"black", fontSize:"16px" }} onClick={tekanLogout}>{setting}</Button>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
            </AppBar>
        </div>
      );
}

export default Navbar