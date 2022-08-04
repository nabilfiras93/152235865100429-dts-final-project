import React, {useEffect, useState} from "react";
import {Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Box, Grid, Link} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../configs/firebase";

const Detail = () => {
    let params = useParams()
    const [detailMakanan, setDetailMakanan] = useState([])
    const [dataMakanan, setDataMakanan] = useState([]);
    const [user] = useAuthState(auth)
    const navigasi = useNavigate();

    if(!user){
        navigasi('/login');
    }

    useEffect(() => {
        const detail = async () => {
            try{
                const tampungData = await axios.get(`/api/recipe/${params.id}`);
                setDetailMakanan(tampungData.data.results);
            } catch(err) {
                console.log("err", err);
            }
        }
        detail()
    }, [detailMakanan, params.id])

    useEffect(() => {
        const makanan = async () => {
            try{
                const tampungData = await axios.get("/api/recipes-length/?limit=5");
                setDataMakanan(tampungData.data.results);
            } catch(err){
                console.log("err", err);
            }
        };
        makanan() 
    }, [])

    return(
        <>
        <Box sx={{ paddingRight:"10px" }}>
            <Grid container spacing={2}>
                <Grid item lg={9} md={12} xs={12} sx={{ marginTop:"20px" }}>
                    <Card sx={{ width: "100%" }}>
                        <CardHeader
                        avatar={
                            <Avatar >
                                <img src={detailMakanan.thumb} alt={detailMakanan.thumb}></img>
                            </Avatar>
                             }
                            title={<Link href='#' underline="hover"><Typography sx={{ color:"black" }} variant="h5">{detailMakanan.title}</Typography></Link>}
                        />  
                        <CardMedia
                            component="img"
                            height="400px"
                            image={detailMakanan.thumb}
                        />                         
                        <CardContent sx={{ display:"flex" }}>
                            <Grid item xs={5}>
                                <Typography variant="h6" sx={{height:"100%"}}>
                                    Bahan-bahan : 
                                    <ul>
                                        {detailMakanan.needItem?.map((bahan) => {
                                            return <li key={bahan.item_name}>{bahan.item_name}</li>
                                        })}
                                        {detailMakanan.ingredient?.map((bahan) => {
                                            return <li key={bahan}>{bahan}</li>
                                        })}
                                    </ul>
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="h6" sx={{height:"100%"}}>
                                    Cara Memasak :
                                    <ul style={{listStyle: "none"}}>
                                        {detailMakanan.step?.map((cara) => {
                                            return <li key={cara} sx={{ listStyle:"none" }}>{cara}</li>
                                        })}
                                    </ul>
                                </Typography>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={12} xs={12}>
                    { dataMakanan.map((makanan) => {
                    return <Card sx={{ width: "100%", marginTop:"20px" }} key={makanan.key}>
                        <CardHeader
                        avatar={
                            <Avatar >
                                <img src={makanan.thumb} alt={makanan.thumb}></img>
                            </Avatar>
                             }
                            title={<Link href={'/makanan/' + makanan.key} underline="hover"><Typography sx={{ color:"black" }}>{makanan.title}</Typography></Link>}
                            />
                        <CardMedia
                            component="img"
                            height="194"
                            image={makanan.thumb}
                            alt={makanan.key}
                        />
                    </Card>
                    })}
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default Detail