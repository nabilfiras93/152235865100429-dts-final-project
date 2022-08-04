import React  , { useState, useEffect } from "react";
import {Box, Typography, TextField, Button} from "@mui/material";
import { Link } from "react-router-dom";
import {auth, login, registrasi} from "../configs/firebase";
import styles from "./Style.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const ViewLogin = ({cek}) => {

    const navigasi = useNavigate();

    const [user] = useAuthState(auth);

    const [akun, setAkun] = useState(
        {
            email:"",
            password: "" 
        }
    );

    const inputEmail = (event) => {
        setAkun({
            ...akun,
            email: event.target.value
        })
    }

    const inputPassword = (event) => {
        setAkun({
            ...akun,
            password: event.target.value
        })
    }

    const onLogin = () => {
        // navigasi("/login");
        login(akun.email, akun.password);
    }

    const onRegister = () => {
        // navigasi("/register")
        registrasi(akun.email, akun.password);

    }

    const tombolLoginatauRegister = () => {
        if(cek === "login"){
            onLogin();
        } else {
            onRegister();
        }
    }

    useEffect(
        () => {
            if(user){
                navigasi('/');
            }
        },
        [user, navigasi] 
    );

    return (
        <>
            <div className={styles.body}>
                <Box
                sx={{
                    width: 300,
                    height: 300,
                    backgroundColor: '#c2c2c2',
                    borderRadius:"25px",
                    textAlign:"center"
                }} component="form" noValidate>
                    <Typography variant="h6" sx={{paddingTop:"20px" }}>{cek === "login" ? "Halaman Login" : "Halaman Register"}</Typography>
                    <TextField label="Username" variant="outlined" size="small" sx={{marginTop:"10px" }} color="success" type="email" value={akun.email} onChange={inputEmail}/>
                    <TextField label="Password" variant="outlined" size="small" sx={{marginTop:"10px" }} color="success" type="password" value={akun.password} onChange={inputPassword}/>
                    <Button variant="contained" sx={{  marginTop:"30px" }} color="success" onClick={tombolLoginatauRegister}>{cek === "login" ? "Login" : "Register"}</Button>
                    {cek === "login" ? (<Link to="/register">
                        <Typography variant="body2" sx={{ marginTop:"10px" , color:"green" , textDecoration:"underline"}}>Silahkan Registrasi</Typography>
                    </Link>) 
                    : 
                    (<Link to="/">
                        <Typography variant="body2" sx={{ marginTop:"10px" , color:"green" , textDecoration:"underline"}} >Langsung Login</Typography>
                    </Link>)}
                </Box>
            </div>
        </>
    );
}

export default ViewLogin;