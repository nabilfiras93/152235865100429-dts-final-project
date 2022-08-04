import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Box, Grid, Link} from '@mui/material/';

const Data = () => {

    const [dataMakanan, setDataMakanan] = useState([]);
    
    useEffect(() => {
        const makanan = async () => {
            try{
                const tampungData = await axios.get("/api/recipes-length/?limit=10");
                setDataMakanan(tampungData.data.results);
            } catch(err){
                console.log("err", err);
            }
        };
        makanan(); 
    },
    []
    )

    console.log(dataMakanan)

    return (
        <>
            <Box sx={{ flexGrow: 1, marginTop:"10px", marginRight:"10px" }}>
                <Grid container spacing={2} justifyContent="center">
                    {dataMakanan.map((makanan) => {
                        return <Grid item xs={12} md={5} lg={3} key={makanan.key}>
                            <Card sx={{ width: "100%", margin:"5px" }}>
                            <CardHeader
                            avatar={
                                <Avatar >
                                    <img src={makanan.thumb} alt={makanan.thum}></img>
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
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Waktu Penyajian : {makanan.times}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Porsi : {makanan.portion}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                    })}
                </Grid>
            </Box>
        </>  
    )
}

export default Data;