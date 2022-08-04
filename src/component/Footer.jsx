import React from "react";
import { Container, Box, Typography } from "@mui/material";

const Footer = () => {
    return(
        <footer>
            <Box sx={{ backgroundColor: "#0578eb91", padding: "5vh 0vh", bottom: "0px", marginTop:"10px"}}>
                <Container>
                    <Box textAlign="center">
                        <Typography variant="h5">DTS React Final Project</Typography>
                    </Box>
                </Container>
            </Box>
        </footer>
    )
}

export default Footer